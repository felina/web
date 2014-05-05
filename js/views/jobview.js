module.exports = Backbone.View.extend({
    render: function() {
        this.$el.html(JST.job(this.model.attributes));

        if (this.model.get('completed')) {
            this.$('.progress').hide();
            this.$('#results').show();
        }

        return this;
    }
});
