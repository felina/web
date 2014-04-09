module.exports = Backbone.View.extend({
    tagName: 'button',
    className: 'btn',
    initialize: function(opts) {
        opts = opts || {};
        this.text = opts.text || '';
        this.onClick = opts.onClick || function() {};
    },
    render: function() {
        var icon = $('<i>').addClass('glyphicon glyphicon-' + this.icon);
        this.setClasses();
        this.$el.append(icon).append('&nbsp;' + this.text);
        return this;
    },
    events: {
        'click': 'click'
    },
    click: function (e) {
        e.preventDefault();
        this.onClick();
    }
});
