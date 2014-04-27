var ImageSet = require('../../collections/image_set');
var Thumbnail = require('../thumbnails/selectable');
var FLImage = require('../../models/image');

/**
Backbone View for an image gallery with selectable images. Used in the image
upload form for choosing which images to upload, and in the job start form,
for choosing which images to run the executable on.
*/
module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'gallery',
    initialize: function(opts) {
        opts = opts || {};

        // Store references to the annotator and metadata view that accompany
        // this gallery, so that when the user selects an image in the gallery
        // they can be updated with its data/metadata
        this.annotator = opts.annotator;
        this.metadataView = opts.metadataView;

        // Set this view's collection to be a new empty ImageSet, which will
        // later be used to store images as they are added to the gallery
        this.collection = new ImageSet();
        // Initially the gallery contains no images, and therefore has a size
        // of zero
        this.size = 0;
    },
    /**
    Add a new image to the gallery
    */
    add: function(opts) {
        // If it's the first image being added, remove the default 'no images'
        // message
        if (this.size === 0){
            this.$el.empty();
        }
        // Instantiate a new Backbone Image model to store the new image's data
        var image = new FLImage(opts);
        // Add the image to the view's collection
        this.collection.add(image);
        // Instanitate a new Backbone Thumbnail view to display the new image
        // in the gallery
        var thumb = new Thumbnail({
            model: image,
            annotator: this.annotator,
            metadataView: this.metadataView
        });
        // Render the thumbnail and append it to the gallery
        thumb.render();
        this.$el.append(thumb.$el);
        // Increment the counter storing the number of images in the gallery
        this.size++;
        // Return a reference to this view for method chaining
        return this;
    },
    render: function(selector) {
        // Set a default 'no images' message when the gallery is first
        // instantiated
        this.$el.text('No images uploaded yet.');
        // Insert the gallery into the DOM by appending it to the element
        // with the given selector
        this.$el.appendTo(selector);
        // Return a reference to this view for method chaining
        return this;
    },
    /**
    Returns an array of all images in the gallery that have been selected
    by the user
    */
    getSelected: function() {
        return this.collection.filter(function(image) {
            return image.get('selected');
        });
    }
});
