module.exports = Backbone.View.extend({
    tagName: 'li',
    className: 'executable',
    initialize: function(opts) {
        opts = opts || {};
        this.name = opts.name;
        this.selected = false;
    },
    render: function() {
        this.$el.append(JST.executable({
            name: this.name
        }));
        return this;
    },
    events: {
        'click input': 'select'
    },
    select: function() {
        this.selected = !this.selected;
    }
});
