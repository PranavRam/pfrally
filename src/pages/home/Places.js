import React, { Component } from 'react';

class Places extends Component {
	componentDidMount() {
		let map = this.props.mapHolderRef.getMap();
		var pyrmont = {lat: -33.924883, lng: 18.422939};
		// var pyrmont = {lat: -33.867, lng: 151.195};
		var service = new google.maps.places.PlacesService(map);
		  service.nearbySearch({
		    location: pyrmont,
		    radius: 1500,
		    types: ['gas_station']
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

export default Places;