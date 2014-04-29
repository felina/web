var goHome = require('../shared/loginutils').goHome;
var Switcher = require('./switcher');

module.exports = Backbone.View.extend({
    tagName: 'header',
    initialize: function(opts) {
        opts = opts || {};
        this.page = opts.page;
    },
    render: function() {
        var that = this;

        $('header').remove();

        api.loginCheck(function(data) {
            that.$el.html(JST.header(data));

            that.$('#logout').on('click', function() {
                api.logout(function(data) {
                    console.log(data);
                    if (data.res) {
                        window.location.reload();
                        goHome();
                    }
                    else {
                        alert('Failed to log out', 'bad');
                    }
                });
            });
            if (data.res) {
                var switcher = new Switcher({
                    level: data.user.privilege
                });
                switcher.render();
                switcher.setIcon(that.page);
                that.$('#hleft').append(switcher.$el);
            }
        });

        return this;
    }
});
