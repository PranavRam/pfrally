import AmpersandModel from 'ampersand-model';

var Location = AmpersandModel.extend({
    props: {
        location: 'object',
        placeId: 'string'
        // stopover: 'boolean'
    }
});

export default Location;