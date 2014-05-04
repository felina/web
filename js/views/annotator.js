/**
Backbone View that wraps the jQuery annotator plugin
*/
module.exports = Backbone.View.extend({
    tagName: 'div',
    initialize: function(opts) {
        opts = opts || {};
        // Default arguments to pass to the annotator constructor
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
        return this;
    },
    setAnnotations: function(annotations){
        this.args.annotations = annotations;
        return this;
    },
    setImage: function(image){
        this.args.img = image;
        return this;
    },
    save: function() {
        if (!this.activeImage) {
            return;
        }

        this.activeImage.set('annotations', this.annotator.getExport());
    }
});
