var ImageSet = require('../collections/image_set');
var Thumbnail = require('./thumbnail');
var FLImage = require('../models/image');

module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'gallery',
    initialize: function(opts) {
        opts = opts || {};

        this.annotator = opts.annotator;
        this.metadataView = opts.metadataView;

        this.collection = new ImageSet();
        this.i = 0;
    },
    add: function(opts) {
        if (this.i === 0){
            this.$el.empty();
        }
        var image = new FLImage(opts);
        this.collection.add(image);
        var thumb = new Thumbnail({
            model: image,
            annotator: this.annotator,
            metadataView: this.metadataView
        });
        thumb.render();
        this.$el.append(thumb.$el);
        this.i++;
        return this;
    },
    render: function(selector) {
        this.$el.text('No images uploaded yet.');
        this.$el.appendTo(selector);
        return this;
    },
    getSelected: function() {
        return this.collection.filter(function(image) {
            return image.get('selected');
        });
    }
});
