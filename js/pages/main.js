var onPageLoad = require('../shared/pageload');
var loginutils = require('../shared/loginutils');
var LoginForm = require('../views/loginform');
var Banner = require('../views/banner');
var makeHeader = loginutils.makeHeader;

var onLogin = function(data) {
    // If the login was successful
    if (data.res) {
        // Inform the user
        alert('Logged in successfully');
        // Hide the login modal
        $('#register').modal('hide');

        // Update the header to replace the login button with the
        // details of the newly logged in user
        makeHeader(data);

        $('#banner form').hide();
    }
    // Login failed
    else {
        // Inform the user
        alert('Invalid username or password');
        console.log(data);
    }
};

$(function(){
    new LoginForm({
        onLogin: onLogin
    });

    onPageLoad('index');

    var banner = new Banner({
        onLogin: onLogin
    });
    banner.render().$el.prependTo('#main');
});
