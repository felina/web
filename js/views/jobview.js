module.exports = Backbone.View.extend({
    render: function() {
        this.$el.html(JST.job(this.model.attributes));

        if (this.model.get('completed')) {
            this.$('.progress').hide();
            this.$('button').hide();
            this.$('#results').show();
        }

        return this;
    },
    events: {
        'click button': 'togglePause'
    },
    togglePause: function() {
        this.$('button i')
            .toggleClass('glyphicon-play')
            .toggleClass('glyphicon-pause');
        this.$('.progress').toggleClass('active');
    }
});
