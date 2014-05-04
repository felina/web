module.exports = Backbone.View.extend({
    tagName: 'div',
    className: 'gallery-item inactive',
    initialize: function (opts) {
        opts = opts || {};
        this.annotator = opts.annotator;
        this.metadataView = opts.metadataView;
    },
    render: function() {
        this.$el.html(JST['gallery/selectable']({
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
        this.$el.toggleClass('inactive');
    },
    onPick: function () {
        this.metadataView.save();
        this.metadataView.activeImage = this.model;
        this.metadataView.update(this.model.get('metadata'));

        this.annotator.save();
        this.annotator.activeImage = this.model;
        this.annotator
            .setImage(this.model.get('image').clone())
            .setAnnotations(this.model.get('annotations'))
            .render();
    }
});
