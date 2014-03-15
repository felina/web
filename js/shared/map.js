module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'map',
    initalize: function() {

    },
    render: function(selector) {
        this.map = this.$el.atlas({
            height: 300,
            width: 500,
            callback: function(text) {
                $('.location-field').val(text);
            },
            style: {
                classes: 'btn btn-default'
            }
        });

        this.$el.appendTo(selector);

        return this;
    }
});
