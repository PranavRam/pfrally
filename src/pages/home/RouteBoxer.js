import React, { Component } from 'react';
import async from 'async';
import {Marker} from "react-google-maps";

class RouteBoxer extends Component {
	state = {
		locations: []
	};

	componentDidMount() {
		let self = this;
		let map = this.props.mapHolderRef.getMap();
		let {boxes, types} = this.props;
		let service = new google.maps.places.PlacesService(map);
		let callbacks = [];
		
		for(let i = 0; i < boxes.length; i++) {
			callbacks.push(
					function(callback) {
							function done(results, status) {
								// console.log('places', results, status);
							  if (status === google.maps.places.PlacesServiceStatus.OK) {
							    // console.log('places', results);
							    return callback(null, results);
							  }
							  callback(null, []);
							}
							// console.log(i, boxes[i]);
							setTimeout(function(){
								service.nearbySearch({
							    bounds: boxes[i],
							    types: types || []
							  }, done);
							},200);
					}
			);
		}

		function drawBoxes(boxes) {
	      let boxpolys = new Array(boxes.length);
	      for (var i = 0; i < boxes.length; i++) {
	        boxpolys[i] = new google.maps.Rectangle({
	          bounds: boxes[i],
	          fillOpacity: 0,
	          strokeOpacity: 1.0,
	          strokeColor: '#000000',
	          strokeWeight: 1,
	          map: map
	        });
	      }
	    }
	    drawBoxes(boxes);

	    /*async.parallel(callbacks,
	    // optional callback
	    function(err, results){
	      
	      setLocations(results.reduce(function(prev, next) {
	      	return prev.concat(next);
	      }))
	        // the results array will equal ['one','two'] even though
	        // the second function had a shorter timeout.
	    });*/

	    function setLocations(locations) {
	    	// console.log(locations, 'gas_stations');
	    	self.setState({
	    		locations: locations
	    	})
	    }
	};

	render() {
		let { locations } = this.state;
		return (
			<div>
				{locations.map((marker, index) => {
				  const ref = `marker_${index}`;
				  return (
				    <Marker key={ref} ref={ref}
				    	mapHolderRef={this.props.mapHolderRef}
				      position={marker.geometry.location}
				     
				      title={ref}>
				    </Marker>
				  );
				})}
			</div>
		);
	}
}

export default RouteBoxer;