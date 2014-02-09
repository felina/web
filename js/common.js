window.alert = function(m){
    var style = {
        position: 'fixed',
        top: 10,
        padding: 10,
        zIndex: 2000,
        borderRadius: 5,
        fontWeight: 'bold'
    };

    var el = $('<div>');
    el.text(m).css(style).addClass('alert-danger').hide().appendTo('body');
    el.css('left', ($('body').width() - el.width()) / 2);

    el.fadeIn().delay(5000).fadeOut(function(){
        $(this).remove();
    });
};

// URL of the server. Comment for development/production
// George server
// window.server = 'http://nl.ks07.co.uk:5000/';
// AWS
window.server = 'http://ec2-54-194-186-121.eu-west-1.compute.amazonaws.com/';
// Local
// window.server = 'http://localhost:5000/';

$(function(){
    var body = $('body');
    var form = $(JST.login());

    $('#logo').popover({
        content: 'hello'
    });

    var fields = {
        email: form.find('#email'),
        password: form.find('#password')
    };

    // Bind an event to the submit button in the login form to send the username
    // and password to the server
    form.find('button').on('click', function(e){
        // Grab the email and password from the DOM
        var email = fields.email.val();
        var password = fields.password.val();

        // Send the request
        $.ajax({
            url: server + 'login',
            type: 'POST',
            data: {
                email: email,
                pass: password
            },
            xhrFields: {
                withCredentials: true
            },
            success: function(data){
                // If the login was successful
                if(data.res){
                    // Inform the user
                    alert('Logged in successfully');
                    // Hide the login modal
                    $('#register').modal('hide');

                    // Store the user's credentials for next time
                    // TODO: use cookies or store a token rather than storing
                    // passwords in plaintext
                    localStorage['felina-email'] = email;
                    localStorage['felina-pass'] = password;

                    // TODO: hardcoded gravatar ID. Server needs to be updated
                    // to provide this
                    data.user.icon = '8ff364476b280cd51aba531052a0603c';

                    // Update the header to replace the login button with the
                    // details of the newly logged in user
                    $('header ul.right').remove();
                    $('header').append(JST.header_right(data));
                }
                // Login failed
                else {
                    // Inform the user
                    alert('Invalid username or password');
                }
            }
        });
    });

    // Add the login form to the page
    body.append(form);

    // Check the user's status on page load so that their name and icon can be
    // displayed in the header
    $.ajax({
        url: server + 'logincheck',
        type: 'GET',
        data: "email=" + localStorage['felina-email'] + "&pass=" + localStorage['felina-pass'],
        xhrFields: {
            withCredentials: true
        },
        success: function(data){
            $('header').append(JST.header_right(data));
        }
    });
});
