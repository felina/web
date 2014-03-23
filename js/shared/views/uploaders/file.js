var API = require('felina-js');
var api = new API('http://nl.ks07.co.uk:5000/');

module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'dropzone',
    initialize: function(opts) {
        opts = opts || {};
        this.callback = opts.callback;
    },
    render: function(selector) {
        this.$el.dropzone({
            init: function () {
                this.on('sending', function(file, xhr, formData) {
                    // Associate this image with a particular project
                    xhr.withCredentials = true;
                    formData.append('file_project', 1);
                });

                this.on('success', function(file, response) {
                    console.log(response);
                });

                this.on('error', function(file, error, xhr) {
                    console.log(file, error, xhr);
                });
            },
            url: api.url + 'img',
            acceptedFiles: 'image/*',
            maxFilesize: 4096,
            accept: this.callback
        });
        this.$el.appendTo(selector);
        return this;
    }
});
