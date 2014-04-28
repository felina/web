/**
Backbone View that wraps the jQuery Atlas map location picker plugin.
*/
module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'location-picker',
    initialize: function(opts) {
        opts = opts || {};
    },
    render: function(selector) {
        this.atlas = this.$el.atlas({
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
        this.atlas.removeMarkers();

        // Update the map with the selected image's location if one has been set
        if (coords && coords.lat && coords.lng) {
            this.atlas.addMarker(coords);
        }
    },
    /**
    Reads the coordinates of the geographic location as selected by the user,
    or null if no location has been chosen.
    */
    readCoords: function() {
        var coords = null;
        if (this.atlas && this.atlas.markers.length > 0) {
            var pos = this.atlas.markers[0].position;
            coords = {
                lat: pos.lat(),
                lng: pos.lng()
            };
        }
        return coords;
    }
});
