window.fl = window.fl || {};

// URL of the server. Comment for development/production
// George server
window.fl.server = 'http://nl.ks07.co.uk:5000/';
// AWS
// window.fl.server = 'http://ec2-54-194-186-121.eu-west-1.compute.amazonaws.com/';
// Local
// window.fl.server = 'http://localhost:5000/';

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
    },
    'user-profile': {
        icon: 'user',
        title: 'User profile'
    }
};

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
var makeHeader = function(data) {
    // Remove the previous dynamic content
    $('header ul.right').remove();
    // Render some new dynamic content
    var h = $(JST.header_right(data));

    h.find('#logout').on('click', function() {
        $.get(fl.server + 'logout', function(data) {
            console.log(data);
            location.reload(true);
        });
    });

    if (data.res) {
        $('#switcher').show();
    } else {
        $('#switcher').hide();
    }

    // Add the new content to the header
    $('header').append(h);
};

var makeSwitcher = function() {
    var switcher = '#switcher';

    var content = $('<ul>');

    for (var key in fl.pages) {
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

window.fl.setSwitcherIcon = function(page) {
    var p = fl.pages[page];
    $('#switcher button').html("<i class='glyphicon glyphicon-" + p.icon + "'></i>&nbsp;" + p.title);
};

window.fl.login = function(url, data) {
    // Send the request
    $.ajax({
        url: fl.server + url,
        type: 'POST',
        data: data,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            // If the login was successful
            if (data.res) {
                // Inform the user
                alert('Logged in successfully');
                // Hide the login modal
                $('#register').modal('hide');

                // Update the header to replace the login button with the
                // details of the newly logged in user
                makeHeader(data);
            }
            // Login failed
            else {
                // Inform the user
                alert('Invalid username or password');
                console.log(data);
            }
        },
        error: function (err) {
            console.error(err);
        }
    });
};

$(function() {
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

    webshims.polyfill();

    // Listen to the return keypress in any of the login fields and submit
    // the form when this happens
    var onEnter = function(e) {
        if (e.charCode === 13) {
            doneButton.trigger('click');
        }
    };

    for (var field in fields) {
        fields[field].on('keypress', onEnter);
    }

    var modes = {
        LOGIN: 1,
        REGISTER: 2
    };

    var mode = null;

    makeSwitcher();

    loginmode.on('click', function() {
        namewrap.hide();
        doneButton.text('Log in');
        loginmode.addClass('btn-primary');
        registermode.removeClass('btn-primary');
        mode = modes.LOGIN;
    });

    form.find('#registermode').on('click', function() {
        namewrap.show();
        doneButton.text('Register');
        loginmode.removeClass('btn-primary');
        registermode.addClass('btn-primary');
        mode = modes.REGISTER;
    });

    loginmode.trigger('click');

    // Bind an event to the submit button in the login form to send the username
    // and password to the server
    doneButton.on('click', function() {
        var url = mode === modes.REGISTER ? 'register' : 'login';
        console.log(url);
        var data = {
            email: fields.email.val(),
            pass: fields.password.val()
        };

        if (mode === modes.REGISTER) {
            data.name = fields.name.val();
        }

        fl.login(url, data);
        // Return false to override the default 'Done' behaviour of closing the
        // modal -- we want to only close it if the login succeeds.
        return false;
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
        success: function(data) {
            makeHeader(data);
        }
    });
});
