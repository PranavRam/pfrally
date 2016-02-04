import AmpersandCollection from 'ampersand-collection';
import Location from '../models/Location';

var Locations = AmpersandCollection.extend({
    model: Location
});

export default Locations;