module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'map',
    initialize: function(opts) {
        opts = opts || {};
    },
    render: function(selector) {
        this.map = this.$el.atlas({
            height: 300,
            width: 500,
            callback: function(text) {
                $('.location-field').val(text);
            },
            style: {
                classes: 'btn btn-default'
            }
        });

        this.$el.appendTo(selector);

        return this;
    },
    update: function(coords) {
        // Clear old markers
        this.map.removeMarkers();

        // Update the map with the selected image's location if one has been set
        if (coords && coords.lat && coords.lng) {
            this.map.addMarker(coords);
        }
    }
});
