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
