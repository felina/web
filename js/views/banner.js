/** Returns a randomly selected wildlife image */
var randomImage = function(){
    var images = ['elephant', 'gull', 'moose', 'panda', 'polar', 'tiger'];
    return "url('/img/" + images[Math.floor(Math.random() * images.length)] + ".jpg')";
};

/**
Large banner unit to display on the homepage. Displays a randomly selected
wildlife photograph, overlayed with a description of the service. Also
provides a login form for fast access to the site for existing users.
*/
module.exports = Backbone.View.extend({
    tagName: 'div',
    id: 'banner',
    initialize: function(opts) {
        opts = opts || {};
        this.onLogin = opts.onLogin;
        var that = this;
        // Remove the login form if the user's logged in
        api.loginCheck(function(data){
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
    /**
    Add support for submitting the login form by pressing the return key
    */
    onEnter: function(e) {
        if (e.charCode === 13) {
            this.submit();
        }
    },
    /**
    Submit's the forms login request
    */
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
    /**
    Render's the view's HTML content
    */
    render: function() {
        this.$el
            // Render the content from the JST
            .html(JST.banner())
            // Add the random wildlife image to the background
            .css('background-image', randomImage());
        return this;
    },
    /**
    Hides the login form, used when the user is already logged in
    */
    hideForm: function() {
        this.$('form').hide();
    }
});
