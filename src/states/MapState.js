// Require the lib
var State = require('ampersand-state');

// Create a constructor to represent the state we want to store
var MapState = State.extend({
    props: {
        showCrime: 'boolean',
        showDisease: 'boolean'
    }
});

export default MapState;