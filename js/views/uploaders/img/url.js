/**
Backbone view for uploading an image already publicly available on the internet
from its URL
*/
module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'form-inline',
    render: function(selector) {
        // Render the view's content from its JST
        this.$el.html(JST.url_uploader());

        // Store references to the view's text field and upload button
        this.field = this.$('input');
        this.button = this.$('button');

        // Insert it into the DOM by appending it to the element with the given
        // selector
        this.$el.appendTo(selector);
        // Return a reference to this view for method chaining
        return this;
    },
    initialize: function(opts) {
        opts = opts || {};
        // Store a reference to the gallery associated with this uploader
        // so that uploaded images can be added to the gallery
        this.gallery = opts.gallery;
    },
    events: {
        'click button': 'onClick'
    },
    /** Called when the user clicks the upload button */
    onClick: function (e) {
        // Prevent the default button action
        e.preventDefault();
        // Read the given URL from the text field
        var url = this.field.val();

        // Ensure the URL is there
        if (url.length === 0) {
            alert('No URL specified');
        }

        var that = this;

        // Check the URL is valid
        $.ajax({
            url: url,
            type: 'HEAD',
            error: function() {
                // Show an error message if the url isn't valid
                alert('Not a valid image URL', 'bad');
            },
            success: function() {
                // Add a new image to the gallery associated with this uploader
                that.gallery.add({src: url});

                // Upload the image to the server
                var data = {
                    url: url,
                    project: $('#species-list').val()
                };

                api.uploadImage(data);
            }
        });
    }
});
