var images = ['elephant', 'gull', 'moose', 'panda', 'polar', 'tiger'];

var randomImage = function(){
    return "url('/img/" + images[Math.floor(Math.random() * images.length)] + ".jpg')";
};

module.exports = Backbone.View.extend({
    tagName: 'div',
    id: 'banner',
    initialize: function(opts) {
        opts = opts || {};
        this.onLogin = opts.onLogin;
        var that = this;
        api.loginCheck(function(data){
            // Remove the login form if the user's logged in
            if (data.res) {
                that.hideForm();
            }
        });
    },
    events: {
        'click button': 'submit',
        'keypress #email': 'onEnter',
        'keypress #password': 'onEnter'
    },
    onEnter: function(e) {
        if (e.charCode === 13) {
            this.submit();
        }
    },
    submit: function() {
         var data = {
            email: this.$('#email').val(),
            pass: this.$('#password').val()
        };

        var that = this;

        api.login(data, this.onLogin, function(err){
            console.error(err);
            that.hideForm();
        });
    },
    render: function() {
        this.$el
            .html(JST.banner())
            .css('background-image', randomImage());
        return this;
    },
    hideForm: function() {
        this.$('form').hide();
    }
});
