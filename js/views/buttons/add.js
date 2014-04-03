module.exports = Backbone.View.extend({
    tagName: 'button',
    className: 'btn btn-success',
    initialize: function(opts) {
        opts = opts || {};
        this.text = opts.text || '';
        this.onClick = opts.onClick || function() {};
    },
    render: function(selector) {
        var icon = $('<i>').addClass('glyphicon glyphicon-plus');
        this.$el.append(icon).append(this.text).appendTo(selector);
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
