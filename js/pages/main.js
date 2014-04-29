var onPageLoad = require('../shared/pageload');
var LoginForm = require('../views/loginform');
var Banner = require('../views/banner');
var Header = require('../views/header');

var onLogin = function(data) {
    // If the login was successful
    if (data.res) {
        // Inform the user
        alert('Logged in successfully', 'good');
        // Hide the login modal
        $('#register').modal('hide');

        var header = new Header({
            page: 'index'
        });
        header.render().$el.prependTo('body');

        $('#banner form').hide();
    }
    // Login failed
    else {
        // Inform the user
        alert('Invalid username or password', 'bad');
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
