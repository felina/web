var RemoveButton = require('./buttons/remove');

module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'form-field-definer',
    initialize: function(opts) {
        opts = opts || {};
        this.required = false;
        this.type = 'Rectangle';
        this.name = 'Untitled';
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
    },
    events: {
        'change #name': 'setName',
        'change #type': 'setType',
        'change #required': 'setRequired'
    },
    setName: function() {
        this.name = this.$('#name').val();
    },
    setType: function() {
        this.type = this.$('#type').find(':selected').text();
    },
    setRequired: function() {
        this.required = this.$('required').is(':checked');
    }
});
