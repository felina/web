module.exports = Backbone.View.extend({
    tagName: 'tr',
    initialize: function (opts) {
        opts = opts || {};
        this.projects = opts.projects;
        this.name = opts.name;
        this.invalid = opts.invalid;
        this.contents = opts.contents;
        this.i = opts.i;
        this.selected = false;
    },
    render: function (selector) {
        this.$el.html(JST.subusers_element({
            i: this.i + 1,
            projects: this.projects
        }));

        var colour = this.invalid === 1 ? 'red' : 'green';
        this.$('.index').css('background-color', colour);

        this.$('#namecontainer').val(this.name);
        this.$('#skcontainer').val(this.contents);

        this.$el.appendTo(selector);
        return this;
    },
    events: {
        'click #select': 'select',
    },
    select: function() {
        this.selected = !this.selected;
    },
    setValidation: function(valid) {
        var newUser = {
            email: this.contents,
            refresh: valid
        };

        var that = this;

        api.updateSub(newUser, function (data) {
            console.log(data);
            if (data.res) {
                that.invalid = valid;
                that.setColour();
            }
        });
    },
    setColour: function() {
        if (this.invalid === -1) {
            this.$el.addClass('danger');
            this.$el.removeClass('success');
        }
        else {
            this.$el.removeClass('danger');
            this.$el.addClass('success');
        }
    },
    refresh: function () {
        this.setValidation(1);
    },
    invalidate: function () {
        this.setValidation(-1);
    },
    edit: function () {
        this.$('#namecontainer').removeAttr('readonly');
    }
});
