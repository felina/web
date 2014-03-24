module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'form-horizontal',
    render: function (selector) {
        this.$el.html(JST.metadata({}));
        this.fields = {
            title: this.$('.title-field'),
            time: this.$('.time-field'),
            date: this.$('.date-field'),
            location: this.$('.location-field')
        };
        this.$el.appendTo(selector);
        return this;
    },
    initialize: function(opts) {
        opts = opts || {};
        this.map = opts.map;
    },
    update: function(model) {
        // Update the text fields with the selected image's metadata
        this.fields.title.val(model.get('title'));
        this.fields.time.val(model.time());
        this.fields.date.val(model.date());
        this.fields.location.val(model.get('location').name);
    },
    readTime: function() {
        return this.fields.time.val() || '00:00:00';
    },
    readDate: function() {
        return this.fields.date.val() || '2000-01-01';
    },
    dateTime: function() {
        return new Date(this.readDate() + 'T' + this.readTime());
    },
    readCoords: function() {
        var coords = null;
        if (this.map.map.markers.length > 0) {
            var pos = this.map.map.markers[0].position;
            coords = {
                lat: pos.lat(),
                lng: pos.lng()
            };
        }
        return coords;
    },
    save: function() {
        if(!this.activeImage) {
            return;
        }

        this.activeImage.get('metadata').set({
            title: this.fields.title.val(),
            datetime: this.dateTime(),
            location: {
                name: this.fields.location.val(),
                coords: this.readCoords()
            }
        });
    }
});
