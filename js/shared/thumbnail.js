window.fl.Thumbnail = Backbone.View.extend({
    tagName: 'div',
    className: 'gallery-item',
    render: function() {
        this.$el.html(JST.gallery_item({
            url: image.url,
            title: image.metadata.title
        }));
        this.$('a').append(img.attr('alt', image.metadata.title));
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
