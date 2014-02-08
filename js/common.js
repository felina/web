window.alert = function(m){
    var style = {
        position: 'absolute',
        top: 0,
        padding: 10,
        zIndex: 2000,
        borderRadius: 5,
        fontWeight: 'bold'
    };

    var el = $('<div>');
    el.text(m).css(style).addClass('alert-danger').hide().appendTo('body');
    el.css('left', ($('body').width() - el.width()) / 2)

    el.fadeIn().delay(5000).fadeOut(function(){
        $(this).remove();
    });
};

window.server = 'http://nl.ks07.co.uk:5000/';

$(function(){
    var body = $('body');
    body.append(JST.credits());
    var form = $(JST.login());

    var fields = {
        email: form.find('#email'),
        password: form.find('#password')
    };

    form.find('button').on('click', function(e){
        var email = fields.email.val();
        var password = fields.password.val();

        $.ajax({
            url: server + 'login',
            type: 'POST',
            data: {
                email: email,
                pass: password
            },
            success: function(data){
                if(data.res){
                    alert('Logged in successfully');
                    $('#register').modal('hide');
                    console.log(data);
                    data.user.icon = '8ff364476b280cd51aba531052a0603c';
                    $('header').remove();
                    $('body').prepend(JST.header(data));
                }
                else{
                    alert('Invalid username or password');
                }
            }
        });
    });

    body.append(form);

    $.get(server + 'logincheck', function(data){
        console.log(data);
        body.prepend(JST.header(data));
    });
});
