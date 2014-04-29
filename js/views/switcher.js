var pages = require('../../data/pages');

module.exports = Backbone.View.extend({
    tagName: 'li',
    id: 'switcher',
    initialize: function (opts) {
        opts = opts || {};
        this.level = opts.level;
    },
    render: function (selector) {
        var button = $('<button>').addClass('btn btn-default');
        this.$el.append(button);

        var content = $('<ul>');

        for (var key in pages) {
            var page = pages[key];
            page.name = key;
            if (this.level >= page.level) {
                content.append(JST.switcher_item(page));
            }
        }

        this.$el.popover({
            html: true,
            content: content.html(),
            trigger: 'click',
            placement: 'bottom',
            container: this.$el
        });

        this.$el.appendTo(selector);

        return this;
    },
    setIcon: function(page) {
        if (!(page in pages)) {
            throw new Error('Invalid page: ' + page);
        }
        var p = pages[page];
        var icon = this.makeIcon(p.icon);
        this.$('button').append(icon).append('&nbsp;' + p.title);
    },
    makeIcon: function(cls) {
        return $('<i>').addClass('glyphicon glyphicon-' + cls);
    }
});
