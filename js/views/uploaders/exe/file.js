module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'dropzone',
    initialize: function(opts) {
        opts = opts || {};
        this.getName = opts.getName;
    },
    render: function(selector) {
        var that = this;
        this.$el.dropzone({
            init: function () {
                this.on('sending', function(file, xhr, formData) {
                    xhr.withCredentials = true;

                    var name = that.getName();

                    console.log(name);

                    formData.append('name', name);
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
