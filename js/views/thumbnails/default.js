module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'gallery-item',
    initialize: function (opts) {
        opts = opts || {};
        this.url = opts.url;
        this.title = opts.title;
    },
    render: function() {
        this.$el.html(JST['gallery/default']({
            url: this.url,
            title: this.title
        }));
        return this;
    }
});
