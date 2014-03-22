var fl = require('./shared/common');

$(function(){
    fl.onPageLoad('index');
    
    var images = ['elephant', 'giraffe', 'leopard'];

    var randomImage = function(){
        return "url('/img/" + images[Math.floor(Math.random() * images.length)] + ".jpg')";
    };

    var banner = $('#banner');

    banner.css({
        'background-image': randomImage()
    });

    banner.find('button').on('click', function(){
        var data = {
            email: banner.find('#email').val(),
            pass: banner.find('#password').val()
        };
        fl.login('login', data);
    });
});
