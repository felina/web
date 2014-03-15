var ImageSet = require('./image_set');
var Thumbnail = require('./thumbnail');
var FLImage = require('./image');

module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'gallery',
    initialize: function() {
        this.collection = new ImageSet();
        this.i = 0;
    },
    add: function(file, annotator) {
        if (this.i === 0){
            this.$el.empty();
        }
        var image = new FLImage(file);
        // this.collection.add(image);
        var thumb = new Thumbnail({
            model: image,
            annotator: annotator
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
            console.log(image.get('selected'));
            return image.get('selected');
        });
    }
});