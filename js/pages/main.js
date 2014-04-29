var onPageLoad = require('../shared/pageload');
var loginutils = require('../shared/loginutils');
var LoginForm = require('../views/loginform');
var makeHeader = loginutils.makeHeader;

var hideForm = function () {
    $('#banner').find('form').hide();
};

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

        hideForm();
    }
    // Login failed
    else {
        // Inform the user
        alert('Invalid username or password');
        console.log(data);
    }
};

$(function(){
    new LoginForm();

    onPageLoad('index');

    var images = ['elephant', 'gull', 'moose', 'panda', 'polar', 'tiger'];

    var randomImage = function(){
        return "url('/img/" + images[Math.floor(Math.random() * images.length)] + ".jpg')";
    };

    var banner = $('#banner');

    banner.css({
        'background-image': randomImage()
    });

    api.loginCheck(function(data){
        // Remove the login form if the user's logged in
        if (data.res) {
            hideForm();
        }
        // Activate it if they aren't
        else {
            banner.find('button').on('click', function(){
                var data = {
                    email: banner.find('#email').val(),
                    pass: banner.find('#password').val()
                };

                api.login(data, onLogin, function(err){
                    console.error(err);
                    hideForm();
                });
            });
        }
    });
});
