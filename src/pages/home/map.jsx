import {default as React, Component} from "react";
import _ from 'lodash';
import {GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer, SearchBox} from "react-google-maps";
import PlacesNearby from './PlacesNearby';
import RouteBoxerMap from './RouteBoxer';
import ampConnector from 'ampersand-react-connector';
import async from 'async';
var GasStations = _.uniqBy(require('../../data/gas_stations.json'), 'place_id');
/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
class Directions extends Component {
  static inputStyle = {
      "border": "1px solid transparent",
      "borderRadius": "1px",
      "boxShadow": "0 2px 6px rgba(0, 0, 0, 0.3)",
      "boxSizing": "border-box",
      "MozBoxSizing": "border-box",
      "fontSize": "14px",
      "height": "32px",
      "marginTop": "10px",
      "outline": "none",
      "padding": "0 12px",
      "textOverflow": "ellipses",
      "width": "400px"
    };

  state = {
    origin: null,
    destination: null,
    waypoints: [],
    directions: {},
    boxes: [],
    fuelMarkers: [],
    bounds: null,
    gasStations: GasStations

  };
  componentWillMount() {
    let locations = this.props.mapLocations.toJSON();
    this.setState({
      origin: locations[0],
      destination: locations[locations.length - 1],
      waypoints: locations.slice(1, locations.length - 1)
    });
  }
  componentWillReceiveProps(nextProps) {
    let locations = nextProps.mapLocations.toJSON();
    this.setState({
      origin: locations[0],
      destination: locations[locations.length - 1],
      waypoints: locations.slice(1, locations.length - 1)
    });
  }
  prepareData() {
    console.log(this.state.waypoints, this.props.mapLocations);
    let self = this;
    let {origin, waypoints, destination } = this.state;
    let chunks = _.chunk(_.concat([origin], waypoints, [destination]), 10);
    let rboxer = new RouteBoxer();
    let distance = 50; // km
    let fuelMarkers = [];
    let callbacks = [];
    function done(directions) {
      let finalDirections;
      if(directions.length > 0){
        finalDirections = directions[0];
      }
      for(let i = 1; i < directions.length; i++) {
        let newDirections = directions[i];
        finalDirections.routes[0].legs = finalDirections.routes[0].legs.concat(newDirections.routes[0].legs);
        finalDirections.routes[0].overview_path = finalDirections.routes[0].overview_path.concat(newDirections.routes[0].overview_path);

        finalDirections.routes[0].bounds = finalDirections.routes[0].bounds.extend(newDirections.routes[0].bounds.getNorthEast());
        finalDirections.routes[0].bounds = finalDirections.routes[0].bounds.extend(newDirections.routes[0].bounds.getSouthWest());
      }
      // console.log(finalDirections, 'final');
      var path = finalDirections.routes[0].overview_path;
      let markers = [];
      var distanceSoFar = 0;
      for (let i = 1; i < path.length; i++) {
        let dist = google.maps.geometry.spherical.computeDistanceBetween(path[i-1], path[i]);
        if((distanceSoFar + dist) / 1000 < 350) {
          distanceSoFar += dist;
        }
        else {
          markers.push(path[i]);
          distanceSoFar = 0;
        }
      }
      let path2 = finalDirections.routes[0].overview_path;
      let boxes = rboxer.box(path2, distance);
    
      self.setState({
        directions: finalDirections || {},
        fuelMarkers: markers,
        boxes: boxes
      });
    }

    for(let i=0; i<chunks.length; i++) {
      callbacks.push(function(callback) {
        let DirectionsService = new google.maps.DirectionsService();
        let currentOrigin = chunks[i][0];
        let currentWaypoints = _.slice(chunks[i], 1, chunks[i].length - 1);
        let currentDestination = _.last(chunks[i]);
        if(i > 0) {
          currentOrigin = _.last(chunks[i - 1]);
        }
        if(currentOrigin.stopover) {
          currentOrigin = currentOrigin.location || currentOrigin;
        }
        if(currentDestination.stopover) {
          currentDestination = currentDestination.location || currentDestination;
        }
        currentWaypoints = currentWaypoints.map((waypoint) => {
          return {
            location: waypoint.location,
            stopover: true
          }
        });
        console.log(currentOrigin, currentDestination, currentWaypoints);
        DirectionsService.route({
          origin: currentOrigin,
          destination: currentDestination,
          waypoints: currentWaypoints,
          travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
          if(status == google.maps.DirectionsStatus.OK) {
            /*directions = _.concat(directions, result);
            console.log(result);
            let path = result.routes[0].overview_path;
            let boxes = rboxer.box(path, distance);
            
            for (let i = 0; i < boxes.length; i++) {
              let bounds = boxes[i];
              // console.log(bounds, boxes);
            }*/
            callback(null, result);
            // console.log('markers', distanceSoFar/1000, markers);
            // fuelMarkers = markers.concat(fuelMarkers)
          }
          else {
            console.error(`error fetching directions ${ result }`);
            callback('error fetching directions');
          }
        });      
      })
    }

    async.parallel(callbacks,
    // optional callback
    function(err, results){
      done(results);
        // the results array will equal ['one','two'] even though
        // the second function had a shorter timeout.
    });
  }
  componentDidMount () {
    this.prepareData();
  };
  handleBoundsChanged () {
    this.setState({
      bounds: this.refs.map.getBounds(),
    });
  }
  handlePlacesChanged () {
    const places = this.refs.searchBox.getPlaces();
    // window.allLocations =  (window.allLocations || []).concat(places);
  }
  render () {
    const {origin, directions, fuelMarkers, boxes, gasStations} = this.state;
    // console.log('origin', boxes);
    // console.log('directions', directions, fuelMarkers.map((fuel) => {
    //   return {
    //     lat: fuel.lat(), lng: fuel.lng() 
    //   }
    // }));
    function shouldRenderDirections() {
      if(directions.routes && this.props.mapState.showCrime){
        return <DirectionsRenderer directions={directions} />;
      }
      return (<noscript />);
    }

    let fuelPositions = fuelMarkers.length ? <PlacesNearby boxes={boxes} directions={directions} location={fuelMarkers[0]} types={['gas_station']} radius={50000}/> : <noscript />;
    let routeBoxer = boxes.length ? <RouteBoxerMap boxes={boxes} types={['gas_station']}/> : <noscript />;
    return (
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              height: "500px",
            }}
          />
        }
        googleMapElement={
          <GoogleMap 
            defaultZoom={3}
            defaultCenter={origin.loc}
            ref="map">
            {fuelMarkers.map((marker, index) => {
              const ref = `marker_${index}`;
              return (
                <Marker key={ref} ref={ref}
                  position={marker}
                  icon= {{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 4
                      }}
                  title={ref}>
                </Marker>
              );
            })}
            {gasStations.map((marker, index) => {
              const ref = marker.place_id;
              return (
                <Marker key={ref} ref={ref}
                  position={marker.geometry.location}
                  icon= {{
                        url: marker.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                      }}
                  title={marker.name}>
                </Marker>
              );
            })}
            {fuelPositions}
            {shouldRenderDirections.call(this)}
            <SearchBox
                      bounds={this.state.bounds}
                      controlPosition={google.maps.ControlPosition.TOP_LEFT}
                      onPlacesChanged={::this.handlePlacesChanged}
                      ref="searchBox"
                      placeholder="Search"
                      style={Directions.inputStyle} />
          </GoogleMap>
        }
      />
    );
  };
}

export default ampConnector(Directions);