/**
 * Creates or updates the annotator element with the given image and its
 * annotations
 * @param {Object} annos - The annotation data to be loaded into the
 * annotator - used for restoring the progress on previously annotated images
 * @param {jQuery object} image - A jQuery-wrapped HTML <img> tag with the
 * image to be displayed
 */
module.exports = Backbone.View.extend({
    tagName: 'div',
    initialize: function(opts) {
        opts = opts || {};
        this.args = {
            width: 500,
            height: 500,
            style: {
                classes: 'btn btn-default'
            }
        };

        if (opts.features) {
            this.args.features = opts.features;
        }

        if (opts.annotations) {
            this.args.annotations = opts.annotations;
        }

        if (opts.image) {
            this.setImage(opts.image);
        }
    },
    render: function () {
        console.log(this.args);
        this.annotator = this.$el.annotator(this.args);
        return this;
    },
    setFeatures: function(features) {
        this.args.features = features;
    },
    setAnnotations: function(annotations){
        this.args.annotations = annotations;
    },
    setImage: function(image){
        this.args.img = image;
        this.render();
    }
});
