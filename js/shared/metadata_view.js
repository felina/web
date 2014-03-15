module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'form-horizontal',
    render: function (selector) {
        this.$el.html(JST.metadata({}));
        this.$el.appendTo(selector);
        return this;
    },
    initalize: function(map) {
        this.map = map;
        this.fields = {
            title: this.$('.title-field'),
            time: this.$('.time-field'),
            date: this.$('.date-field'),
            location: this.$('.location-field')
        };
    },
    update: function() {
        // Update the text fields with the selected image's metadata
        this.fields.title.val(this.model.get('title'));
        this.fields.time.val(this.model.time());
        this.fields.date.val(this.model.date());
        this.fields.location.val(this.model.get('location').name);
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
        if (this.map.markers.length > 0) {
            var pos = this.map.markers[0].position;
            // Great variable names here GMaps.js cheers for that
            coords = {
                lat: pos.d,
                lng: pos.e
            };
        }
        return coords;
    },
    save: function() {
        var meta = this.model.get('metadata');

        meta.set({
            title: this.fields.title.val(),
            datetime: this.dateTime(),
            location: {
                name: this.fields.location.val(),
                coords: this.readCoords()
            }
        });

        this.model.set('metadata', meta);

        // images[i].annotations = fl.annotator.getExport();
        // makeAnnotator(annos, image);
    }
});
