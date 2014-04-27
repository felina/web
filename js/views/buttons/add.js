var BaseButton = require('./base');

/**
Generic Backbone View for a button for adding a new item
*/
module.exports = BaseButton.extend({
    setClasses: function() {
        this.$el.addClass('btn-success');
    },
    icon: 'plus'
});
