var Metadata = require('./metadata');

module.exports = Backbone.Model.extend({
    defaults: {
        selected: false,
        url: null,
        metadata: null,
        annotations: {}
    },
    initialize: function(opts) {
        opts = opts || {};

        if (!opts.file && !opts.src) {
            throw new Error('Please specify either a file or a source URL for the image');
        }

        if (opts.file) {
            var file = opts.file;

            // var reader  = new FileReader();

            //   reader.onloadend = function () {
            //     console.log(reader.result);
            //   };
            // reader.readAsDataURL(file);

            this.set('file', file);
            this.set('src', file.name);
            this.set('metadata', new Metadata({
                title: file.name,
                id: this.id
            }));
            this.loadFromFile();
        }
        else {
            var src = opts.src;

            if (src.length === 0) {
                throw new Error('Invalid URL: ' + src);
            }

            this.set('metadata', new Metadata({
                title: src
            }));
            this.loadFromSrc(src);
        }

        this.get('image').attr('alt', this.get('metadata').get('title'));
    },
    toJSON: function() {
        return {
            metadata: this.get('metadata').toJSON(),
            annotations: this.get('annotations')
        };
    },
    loadFromSrc: function (src) {
        var img = $('<img>')[0];
        img.src = src;
        this.set('image', $(img));
    },
    loadFromFile: function () {
        var file = this.get('file');
        console.log(file);

        var img = $('<img>')[0];
        img.file = file;

        var reader = new FileReader();
        reader.onload = (function(i) {
            return function(e) {
                i.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);

        this.set('image', $(img));
    }
});
