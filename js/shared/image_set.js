var FLImage = require('./image');

module.exports = Backbone.Collection.extend({
    model: FLImage,
    events: {
        'add': 'onAdd'
    },
    onAdd: function(e) {
        console.log(e);
    }
});
