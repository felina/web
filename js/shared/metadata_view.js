module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'form-horizontal',
    render: function (selector) {
        this.$el.html(JST.metadata({}));
        this.$el.appendTo(selector);
        return this;
    },
    initalize: function() {
        this.fields = {
            title: this.$('.title-field'),
            time: this.$('.time-field'),
            date: this.$('.date-field'),
            location: this.$('.location-field')
        };
    },
    update: function() {
        // Update the text fields with the selected image's metadata
        this.fields.title.val(this.model.get('title'));
        this.fields.time.val(this.model.time());
        this.fields.date.val(this.model.date());
        this.fields.location.val(this.model.get('location').name);
    }
});
