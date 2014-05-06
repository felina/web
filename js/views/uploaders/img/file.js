module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'dropzone',
    initialize: function(opts) {
        opts = opts || {};
        this.gallery = opts.gallery;
        this.picker = opts.picker;
    },
    render: function(selector) {
        var that = this;
        this.$el.dropzone({
            init: function () {
                this.on('sending', function(file, xhr, formData) {
                    // Associate this image with a particular project
                    xhr.withCredentials = true;
                    formData.append('project', that.picker.selectedID);
                });

                this.on('success', function(file, response) {
                    // TODO: server should return a HTTP error code rather than
                    // a valid response with an error object.
                    if (response.res){
                        // TODO: update server to only accept and return single images
                        var id = response.id;

                        var collection = that.gallery.collection;

                        var lastImage = collection.at(collection.length - 1);
                        lastImage.set('id', id);
                        console.log(lastImage.get('id'));
                    }
                    else {
                        alert(response.err.msg);
                    }
                });

                this.on('error', function(file, error, xhr) {
                    console.log(file, error, xhr);
                });
            },
            url: api.url + 'images',
            acceptedFiles: 'image/*',
            maxFilesize: 4096,
            paramName: 'image',
            accept: function(file, done) {
                that.gallery.add({
                    file: file,
                    pickable: true
                });
                done();
            }
        });
        this.$el.appendTo(selector);
        return this;
    }
});
