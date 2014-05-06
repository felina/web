module.exports = Backbone.Model.extend({
    defaults: {
        csvurl: ''
    },
    initialize: function() {
        this.set('percent', this.get('progress') * 100 + '');
    }
});
