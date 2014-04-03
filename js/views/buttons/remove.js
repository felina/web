var BaseButton = require('./base');
module.exports = BaseButton.extend({
    setClasses: function() {
        this.$el.addClass('btn-danger');
    },
    icon: 'remove'
});
