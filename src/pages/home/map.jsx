import {default as React, Component} from "react";
import _ from 'lodash';
import {GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";
import Places from './Places'
/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class Directions extends Component {

  state = {
    origin: new google.maps.LatLng(-33.924883, 18.422939),
    destination: new google.maps.LatLng(-23.886644, 35.389152),
    waypoints: [{
        location: new google.maps.LatLng(-27.714356, 17.578677),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-27.524209, 17.814492),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-24.633021, 17.966635),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-22.553888, 17.093652),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-22.550780, 17.090306),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-19.555928, 15.876853),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-18.801727, 17.045227),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-17.912984, 19.764574),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-17.887535, 25.844136),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-15.374094, 28.317047),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-13.661040, 32.657911),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-13.780398, 34.458532),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-14.055898, 34.885345),
        stopover: true,
      }, {
        location: new google.maps.LatLng(-22.007391, 35.322869),
        stopover: true,
      }
    ],
    directions: {},
    boxes: [],
    fuelMarkers: []
  };

  componentDidMount () {
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
      self.setState({
        directions: finalDirections || {},
        fuelMarkers: fuelMarkers
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
          // console.log('markers', distanceSoFar/1000, markers);
          fuelMarkers = fuelMarkers.concat(markers)
        }
        else {
          console.error(`error fetching directions ${ result }`);
        }
        if(count === chunks.length) {
          done();
        }
      });
    }
  };

  render () {
    const {origin, directions, fuelMarkers} = this.state;
    console.log('directions', directions);
    function shouldRenderDirections() {
      if(directions.routes){
        return <DirectionsRenderer directions={directions} />;
      }
      return (<noscript />);
    }
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
                  title="Fuel Marker">
                </Marker>
              );
            })}
            <Places />
            {shouldRenderDirections()}
          </GoogleMap>
        }
      />
    );
  };
}