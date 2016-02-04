import {default as React, Component} from "react";
import _ from 'lodash';
import {GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";
import PlacesNearby from './PlacesNearby'
import ampConnector from 'ampersand-react-connector'
/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
class Directions extends Component {

  state = {
    origin: null,
    destination: null,
    waypoints: [],
    directions: {},
    boxes: [],
    fuelMarkers: []
  };
  componentWillMount() {
    let locations = this.props.mapLocations.toJSON();
    this.setState({
      origin: locations[0].location,
      destination: locations[locations.length - 1].location,
      waypoints: locations.slice(1, locations.length - 1)
    });
  }
  componentWillReceiveProps(nextProps) {
    let locations = nextProps.mapLocations.toJSON();
    this.setState({
      origin: locations[0].location,
      destination: locations[locations.length - 1].location,
      waypoints: locations.slice(1, locations.length - 1)
    });
  }
  prepareData() {
    console.log(this.state.waypoints, this.props.mapLocations);
    var self = this;
    var {origin, waypoints, destination } = this.state;
    let chunks = _.chunk(_.concat([origin], waypoints, [destination]), 10);
    var rboxer = new RouteBoxer();
    var distance = 20; // km
    let directions = [];
    let fuelMarkers = [];
    let count = 0;

    function done() {
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
      console.log(finalDirections, 'final');
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
      self.setState({
        directions: finalDirections || {},
        fuelMarkers: markers
      });
    }

    for(let i=0; i<chunks.length; i++) {
      let DirectionsService = new google.maps.DirectionsService();
      var currentOrigin = chunks[i][0];
      var currentWaypoints = _.slice(chunks[i], 1, chunks[i].length - 1);
      var currentDestination = _.last(chunks[i]);
      if(i > 0) {
        currentOrigin = _.last(chunks[i - 1]);
      }
      if(currentOrigin.stopover) {
        currentOrigin = currentOrigin.location;
      }
      if(currentDestination.stopover) {
        currentDestination = currentDestination.location;
      }
      currentWaypoints.map((waypoint) => {
        if(!waypoint.stopover) {
          return {
            location: waypoint,
            stopover: true
          }
        }
        return waypoint;
      });

      DirectionsService.route({
        origin: currentOrigin,
        destination: currentDestination,
        waypoints: currentWaypoints,
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
        count++;
        if(status == google.maps.DirectionsStatus.OK) {
          directions = _.concat(directions, result);
          console.log(result);
          var path = result.routes[0].overview_path;
          var boxes = rboxer.box(path, distance);
          
          for (let i = 0; i < boxes.length; i++) {
            var bounds = boxes[i];
            // console.log(bounds, boxes);
          }
          
          // console.log('markers', distanceSoFar/1000, markers);
          // fuelMarkers = markers.concat(fuelMarkers)
        }
        else {
          console.error(`error fetching directions ${ result }`);
        }
        if(count === chunks.length) {
          done();
        }
      });
    }
  }
  componentDidMount () {
    this.prepareData();
  };

  render () {
    const {origin, directions, fuelMarkers} = this.state;
    console.log('origin', origin);
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

    let fuelPositions = fuelMarkers.length ? <PlacesNearby location={fuelMarkers[0]} types={['gas_station']} radius={50000}/> : <noscript />;
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
            defaultCenter={origin}>
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
            {fuelPositions}
            {shouldRenderDirections.call(this)}
          </GoogleMap>
        }
      />
    );
  };
}

export default ampConnector(Directions);