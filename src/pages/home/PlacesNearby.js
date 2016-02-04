import React, { Component } from 'react';

class PlacesNearby extends Component {
	componentDidMount() {
		let map = this.props.mapHolderRef.getMap();
		let {radius, types, location, boxes, directions} = this.props;
		var pyrmont = {lat: -33.924883, lng: 18.422939};
		var loc = {
			lat: location.lat(),
			lng: location.lng()
		}
		// let service = nativeew google.maps.places.PlacesService(map);
		var request = {
		    bounds: boxes[4],
		    types: ['gas_station']
		  };
		  // service.radarSearch(request, callback);
		var service = new google.maps.places.PlacesService(map);
		  service.nearbySearch({
		    bounds: boxes[3],
		    // radius: radius || 500,
		    types: types || []
		  }, callback);
		function callback(results, status) {
			// console.log('places', results, status);
		  if (status === google.maps.places.PlacesServiceStatus.OK) {
		    // for (var i = 0; i < results.length; i++) {
		    //   createMarker(results[i]);
		    // }
		    console.log('places', results)
		  }
		}
	};

	render() {
		return (<noscript />);
	}
}

export default PlacesNearby;