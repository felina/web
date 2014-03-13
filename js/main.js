var common = require('./common');
var api = require('../vendor/felina-js/src/main')();

$(function() {
    common.onPageLoad();

    var images = ['elephant', 'giraffe', 'leopard'];

    var randomImage = function(){
        return "url('/img/" + images[Math.floor(Math.random() * images.length)] + ".jpg')";
    };

    var banner = $('#banner');

    banner.css({
        'background-image': randomImage()
    });

    common.setSwitcherIcon('index');

    banner.find('button').on('click', function(){
        var data = {
            email: banner.find('#email').val(),
            pass: banner.find('#password').val()
        };
        api.login('login', data);
    });
});
