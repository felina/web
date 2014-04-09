var onPageLoad = require('../shared/pageload');
var onLogin = require('../shared/loginutils').onLogin;
var LoginForm = require('../views/loginform');

$(function(){
    new LoginForm();

    onPageLoad('index');

    var images = ['elephant', 'giraffe', 'leopard'];

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
            banner.find('form').hide();
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
                });
            });
        }
    });
});
