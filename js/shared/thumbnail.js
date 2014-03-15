module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'gallery-item',
    initialize: function (opts) {
        opts = opts || {};
        this.annotator = opts.annotator;
    },
    render: function() {
        this.$el.html(JST.gallery_item({
            url: this.model.get('url'),
            title: this.model.get('metadata').get('title')
        }));
        var img = this.model.get('image');
        this.$('a').append(img);
        return this;
    },
    events: {
        'change input': 'onSelect',
        'click .picker': 'onPick'
    },
    onSelect: function () {
        this.model.set('selected', !this.model.get('selected'));
        this.$el.toggleClass('active');
    },
    onPick: function () {
        this.annotator.setImage(this.model.get('image'));
    }
});