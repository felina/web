module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'form-field-definer',
    initialize: function(opts) {
        opts = opts || {};
    },
    render: function (selector) {
        this.$el.addClass('form-horizontal');
        this.$el.attr('role', 'form');

        this.$el.html(JST.form_field_definer());

        this.$el.appendTo(selector);
        return this;
    },
    events: {
        'click .closer': 'close'
    },
    close: function() {
        this.remove();
    }
});
