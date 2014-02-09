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

window.fl = window.fl || {};

// URL of the server. Comment for development/production
// George server
// window.server = 'http://nl.ks07.co.uk:5000/';
// AWS
window.fl.server = 'http://ec2-54-194-186-121.eu-west-1.compute.amazonaws.com/';
// Local
// window.server = 'http://localhost:5000/';

window.fl.pages = {
    'index': {
        icon: 'home',
        title: 'Home'
    },
    'upload/image': {
        icon: 'picture',
        title: 'Upload images'
    },
    'upload/executable': {
        icon: 'cloud-upload',
        title: 'Upload executables'
    },
    'settings': {
        icon: 'cog',
        title: 'Settings'
    },
    'start-job': {
        icon: 'plus',
        title: 'Start a new job'
    },
    'define-form': {
        icon: 'pencil',
        title: 'Define a custom form'
    },
    'view-jobs': {
        icon: 'wrench',
        title: 'View jobs'
    },
    'graphs': {
        icon: 'signal',
        title: 'Graphs'
    }
};

var makeHeader = function(data){
    // Remove the previous dynamic content
    $('header ul.right').remove();
    // Render some new dynamic content
    console.log(data);
    var h = $(JST.header_right(data));

    h.find('#logout').on('click', function(e){
        $.get(fl.server + 'logout', function(data){
            console.log(data);
            location.reload(true);
        });
    });

    // Add the new content to the header
    $('header').append(h);
};

var makeSwitcher = function(){
    var switcher = '#switcher';

    var content = $('<ul>');

    for(key in fl.pages){
        var page = fl.pages[key];
        page.name = key;
        content.append(JST.switcher_item(page));
    }

    $(switcher).popover({
        html: true,
        content: content.html(),
        trigger: 'hover',
        placement: 'bottom',
        container: switcher
    });
};

window.fl.setSwitcherIcon = function(page){
    var p = fl.pages[page];
    $('#switcher button').html("<i class='glyphicon glyphicon-" + p.icon + "'></i>&nbsp;" + p.title);
};

window.fl.login = function(url, data){
    // Send the request
    $.ajax({
        url: fl.server + url,
        type: 'POST',
        data: data,
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

                // TODO: hardcoded gravatar ID. Server needs to be updated
                // to provide this
                data.user.icon = '8ff364476b280cd51aba531052a0603c';

                // Update the header to replace the login button with the
                // details of the newly logged in user
                makeHeader(data);
            }
            // Login failed
            else {
                // Inform the user
                alert('Invalid username or password');
            }
        }
    });
};

$(function(){
    var body = $('body');
    var form = $('#register');
    var doneButton = form.find('.modal-footer button');
    var namewrap = form.find('#namewrap');
    var loginmode = form.find('#loginmode');
    var registermode = form.find('#registermode');

    var fields = {
        name: form.find('#name'),
        email: form.find('#email'),
        password: form.find('#password')
    };

    var modes = {
        LOGIN: 1,
        REGISTER: 2
    };

    var mode = null;

    makeSwitcher();

    loginmode.on('click', function(){
        namewrap.hide();
        doneButton.text('Log in');
        loginmode.addClass('btn-primary');
        registermode.removeClass('btn-primary');
        mode = modes.LOGIN;
    });

    form.find('#registermode').on('click', function(){
        namewrap.show();
        doneButton.text('Register');
        loginmode.removeClass('btn-primary');
        registermode.addClass('btn-primary');
        mode = modes.REGISTER;
    });

    loginmode.trigger('click');

    // Bind an event to the submit button in the login form to send the username
    // and password to the server
    doneButton.on('click', function(e){
        var url = mode === modes.REGISTER ? 'register' : 'login';
        console.log(url);
        var data = {
            email: fields.email.val(),
            pass: fields.password.val()
        };

        if(mode === modes.REGISTER){
            data.name = fields.name.val();
        }

        fl.login(url, data);
    });

    // Add the login form to the page
    body.append(form);

    // Check the user's status on page load so that their name and icon can be
    // displayed in the header
    $.ajax({
        url: fl.server + 'logincheck',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function(data){
            makeHeader(data);
        }
    });
});
