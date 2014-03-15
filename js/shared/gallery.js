var ImageSet = require('./image_set');

module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'gallery',
    initialize: function() {
        this.collection = new ImageSet();
    },
    add: function(image) {
        this.collection.add(image);
    },
    render: function(selector) {
        this.$el.text('HI!');
        this.$el.appendTo(selector);
        return this;
    }
});
