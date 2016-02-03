import React, { Component } from 'react';

class PlacesNearby extends Component {
	componentDidMount() {
		let map = this.props.mapHolderRef.getMap();
		let {radius, types, location} = this.props;
		var pyrmont = {lat: -33.924883, lng: 18.422939};
		var loc = {
			lat: location.lat(),
			lng: location.lng()
		}
		console.log(loc, 'location', types, radius);
		var service = new google.maps.places.PlacesService(map);
		  service.nearbySearch({
		    location: loc || pyrmont,
		    radius: radius || 500,
		    types: types || []
		  }, callback);
		function callback(results, status) {
			console.log('places', results, status);
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