import React, { Component } from 'react';

class CrimeOverlay extends Component {
	componentDidMount() {
		let map = this.props.mapHolderRef.getMap();
		console.log(map);
		var rectangle = new google.maps.Rectangle({
		    strokeColor: '#FF0000',
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: '#FF0000',
		    fillOpacity: 0.35,
		    map: map,
		    bounds: {
		      north: 33.685,
		      south: 33.671,
		      east: -116.234,
		      west: -116.251
		    }
		  });
	};

	render() {
		return (<noscript />);
	}
}

export default CrimeOverlay;