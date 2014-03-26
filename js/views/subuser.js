module.exports = Backbone.View.extend({
    tagName: 'tr',
    initialize: function (opts) {
        opts = opts || {};
        this.projects = opts.projects;
        this.name = opts.name;
        this.invalid = opts.invalid;
        this.contents = opts.contents;
        this.i = opts.i;
    },
    render: function (selector) {
        this.$el.html(JST.subusers_element({
            i: this.i,
            projects: this.projects
        }));

        var colour = this.invalid ? 'red' : 'green';
        this.$('#tablenu').css('background-color', colour);

        this.$('#namecontainer').val(this.name);
        this.$('#skcontainer').val(this.contents);

        this.$el.appendTo(selector);
        return this;
    },
    events: {
        'click #refresh': 'refresh',
        'click #invalidate': 'invalidate',
        'click #edit': 'edit'
    },
    refresh: function () {
        var newUser = {
            email: this.contents,
            refresh: 1
        };

        api.post('updatesub', newUser, function (data) {
            if (data.res) {
                // Give info about successful refresh
            }
        });
    },
    invalidate: function () {
        var newUser = {
            email: this.contents,
            refresh: -1
        };

        var that = this;

        api.post('updatesub', newUser, function (data) {
            if (data.res) {
                // Give info about successful invalidate
                that.$('#tablenu').css('background-color', 'yellow');
            }
        });
    },
    edit: function () {
        this.$('#namecontainer').removeAttr('readonly');
    }
});
