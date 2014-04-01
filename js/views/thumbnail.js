module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'gallery-item',
    initialize: function (opts) {
        opts = opts || {};
        this.annotator = opts.annotator;
        this.metadataView = opts.metadataView;
    },
    render: function() {
        this.$el.html(JST.gallery_selectable({
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
        this.annotator.setImage(this.model.get('image').clone());
        this.metadataView.save();
        this.metadataView.activeImage = this.model;
        this.metadataView.update(this.model.get('metadata'));
    }
});
