$(function(){
    var images = ['elephant'];

    var randomImage = function(){
        return "url('/img/" + images[Math.floor(Math.random() * images.length)] + ".jpg')"
    };

    $('#banner').css({
        'background-image': randomImage()
    });

    $('.container').append(JST.footer());
});
