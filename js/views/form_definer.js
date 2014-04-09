var RemoveButton = require('./buttons/remove');

module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'form-field-definer',
    initialize: function(opts) {
        opts = opts || {};
    },
    render: function (selector) {
        var that = this;
        var removeButton = new RemoveButton({
            text: 'Remove field',
            onClick: that.remove
        });
        removeButton.render();
        this.$el.prepend(removeButton);

        this.$el.addClass('form-horizontal');
        this.$el.attr('role', 'form');

        this.$el.html(JST.form_field_definer());

        this.$el.appendTo(selector);
        return this;
    }
});
