var api = require('felina-js')();

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

var modes = {
    LOGIN: 1,
    REGISTER: 2
};

var LoginForm = Backbone.View.extend({
    initialize: function() {
        this.$el = $('#register');
        this.fields = {
            namewrap: this.$('#namewrap'),
            doneButton: this.$('.modal-footer button'),
            loginmode: this.$('#loginmode'),
            registermode: this.$('#registermode'),
            name: this.$('#name'),
            email: this.$('#email'),
            password: this.$('#password')
        };

        this.loginMode();
    },
    events: {
        'click #loginmode': 'loginMode',
        'click #registermode': 'registerMode',
        'click .modal-footer button': 'onSubmit',
        'keypress #name': 'onEnter',
        'keypress #email': 'onEnter',
        'keypress #password': 'onEnter'
    },
    loginMode: function() {
        this.fields.namewrap.hide();
        this.fields.doneButton.text('Log in');
        this.fields.loginmode.addClass('btn-primary');
        this.fields.registermode.removeClass('btn-primary');
        this.mode = modes.LOGIN;
    },
    registerMode: function() {
        this.fields.namewrap.show();
        this.fields.doneButton.text('Register');
        this.fields.loginmode.removeClass('btn-primary');
        this.fields.registermode.addClass('btn-primary');
        this.mode = modes.REGISTER;
    },
    onEnter: function(e) {
        if (e.charCode === 13) {
            this.onSubmit();
        }
    },
    onSubmit: function() {
        var data = {
            email: this.fields.email.val(),
            pass: this.fields.password.val()
        };

        if (this.mode === modes.REGISTER) {
            data.name = this.fields.name.val();
            api.register(data, this.onLogin);
        }
        else {
            api.login(data, this.onLogin);
        }

        // Return false to override the default 'Done' behaviour of closing the
        // modal -- we want to only close it if the login succeeds.
        return false;
    },
    onLogin: function(data) {
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
    }
});

module.exports = {
    LoginForm: LoginForm,
    makeHeader: makeHeader
};
