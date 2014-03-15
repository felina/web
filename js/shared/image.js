var Metadata = require('./metadata');

module.exports = Backbone.Model.extend({
    defaults: {
        selected: false,
        url: null,
        metadata: null,
        annotations: {}
    },
    initialize: function(file) {
        this.set('file', file);
        this.set('url', file.name);
        this.set('metadata', new Metadata(file.name));
        this.load();
        console.log(this.get('image'));
        // this.image.attr('alt', this.metadata.get('title'));
    },
    load: function () {
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
