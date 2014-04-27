var BaseButton = require('./base');

/**
Generic Backbone View for a button for removing an existing item
*/
module.exports = BaseButton.extend({
    setClasses: function() {
        this.$el.addClass('btn-danger');
    },
    icon: 'remove'
});
