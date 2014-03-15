var api = require('felina-js')();

var getJSON = function(filename, success) {
    $.ajax({
        type: 'GET',
        url: '/data/' + filename + '.json',
        async: false,
        dataType: 'json',
        success: success,
        error: function (err, txt) {
            console.log(txt);
        }
    });
};

var pages;

getJSON('pages', function (data) {
    pages = data;
});

/**
 * Creates the necessary DOM structure for the contents of the page header,
 * and inserts it into the page.
 * @param {Object} data - The data to be displayed in the header.
 */
var makeHeader = function(data) {
    // Remove the previous contents
    $('header ul.right').remove();
    // Render the new contents from the template
    var h = $(JST.header_right(data));

    h.find('#logout').on('click', function() {
        api.logout(function(data) {
            console.log(data);
            location.reload(true);
        });
    });

    // Hide the switcher if the user isn't logged in so that unauthorized
    // users can't access other areas of the site.
    $('#switcher').toggle(data.res);

    // Add the new content to the header
    $('header').append(h);
};

/**
 * Creates the necessary DOM structure for the page switcher, using data from
 * the page config object, then inserts it into the page as a Bootstrap Popover
 * at the given selector
 * @param {string} selector - The CSS selector of the parent element of the
 * switcher.
 */
var makeSwitcher = function(selector) {
    var content = $('<ul>');

    for (var key in pages) {
        var page = pages[key];
        page.name = key;
        content.append(JST.switcher_item(page));
    }

    $(selector).popover({
        html: true,
        content: content.html(),
        trigger: 'hover',
        placement: 'bottom',
        container: selector
    });
};

var onLogin = function(data) {
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
};

var setSwitcherIcon = function(page) {
    var p = pages[page];
    var icon = $('<i>').addClass('glyphicon glyphicon-' + p.icon);
    $('#switcher button').append(icon).append('&nbsp;' + p.title);
};

var onPageLoad = function() {
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

    makeSwitcher('#switcher');

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
        var data = {
            email: fields.email.val(),
            pass: fields.password.val()
        };

        if (mode === modes.REGISTER) {
            data.name = fields.name.val();
            api.register(data, onLogin);
        }
        else {
            api.login(data, onLogin);
        }

        // Return false to override the default 'Done' behaviour of closing the
        // modal -- we want to only close it if the login succeeds.
        return false;
    });

    // Add the login form to the page
    body.append(form);

    // Check the user's status on page load so that their name and icon can be
    // displayed in the header
    api.loginCheck(function(data) {
        console.log(data);
        makeHeader(data);
    });
};

module.exports = {
    getJSON: getJSON,
    makeHeader: makeHeader,
    makeSwitcher: makeSwitcher,
    onPageLoad: onPageLoad,
    setSwitcherIcon: setSwitcherIcon,
    onLogin: onLogin
};
