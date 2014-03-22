module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'form-inline',
    render: function(selector) {
        this.$el.html(JST.url_uploader());

        this.field = this.$('input');
        this.button = this.$('button');

        this.$el.appendTo(selector);
        return this;
    },
    initialize: function(opts) {
        opts = opts || {};
        this.gallery = opts.gallery;
    },
    events: {
        'click button': 'onClick'
    },
    onClick: function (e) {
        e.preventDefault();
        var url = this.field.val();

        if (url.length === 0) {
            alert('No URL specified');
        }

        this.gallery.add({src: url});
    }
});
