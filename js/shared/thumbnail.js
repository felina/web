module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'gallery-item',
    render: function() {
        // var title = this.model.get('metadata').title;
        this.$el.html(JST.gallery_item({
            url: this.model.get('url'),
            title: 'hi'
        }));
        this.$('a').append(this.model.get('image'));
        return this;
    },
    events: {
        'change input': 'onSelect',
        'click .picker': 'onPick',
    },
    onSelect: function () {
        this.model.set('selected', !this.model.get('selected'));
        this.$el.toggleClass('active');
    },
    onPick: function() {
        save();
        restore();
    }
});
