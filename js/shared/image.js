var Metadata = require('./metadata');

module.exports = Backbone.Model.extend({
    defaults: {
        selected: false,
        url: null,
        metadata: null,
        annotations: {}
    },
    initialize: function(file) {
        this.file = file;
        this.url = file.name;
        this.metadata = new Metadata(file.name);
        this.load();
    },
    load: function () {
        var img = $('<img>')[0];
        var reader = new FileReader();
        img.file = this.file;
        reader.onload = (function(i) {
            return function(e) {
                i.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(this.file);
        this.image = $(img);
    }
});
