module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'dropzone',
    initialize: function(opts) {
        opts = opts || {};
    },
    render: function(selector) {
        this.$el.dropzone({
            init: function () {
                this.on('sending', function(file, xhr, formData) {
                    // Associate this image with a particular project
                    xhr.withCredentials = true;
                    formData.append('name', 'samIsAFatHo');
                });

                this.on('success', function(file, response) {
                   console.log(file, response);
                });

                this.on('error', function(file, error, xhr) {
                    console.log(file, error, xhr);
                });
            },
            url: api.url + 'exec',
            acceptedFiles: '.zip',
            maxFilesize: 4096,
            accept: function(file, done) {
                console.log(file);
                done();
            }
        });
        this.$el.appendTo(selector);
        return this;
    }
});
