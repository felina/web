var Thumbnail = require('../thumbnails/default');

module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'gallery',
    initialize: function(opts) {
        opts = opts || {};
        this.i = 0;
    },
    add: function(opts) {
        if (this.i === 0){
            this.$el.empty();
        }
        var thumb = new Thumbnail({
            url: opts.url,
            title: opts.title
        });
        thumb.render();
        this.$el.append(thumb.$el);
        this.i++;
        return this;
    },
    render: function(selector) {
        this.$el.text('No images addeed yet.');
        this.$el.appendTo(selector);
        return this;
    }
});
