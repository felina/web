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

$(function(){
    var server = 'http://nl.ks07.co.uk:5000/';

    var user = {
        loggedin: true,
        username: 'John Doe',
        icon: '8ff364476b280cd51aba531052a0603c'
    };

    var nouser = {
        loggedin: false
    };

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
            method: 'post',
            data: {
                email: email,
                pass: password
            },
            success: function(data){
                if(data.res){
                    alert('Logged in successfully');
                    $('#register').modal('hide');
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
        if(data.res){
            body.prepend(JST.header(user));
        }
        else {
            body.prepend(JST.header(nouser));
        }
    });
});
