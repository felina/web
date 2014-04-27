var utils = require('../shared/loginutils');

/**
Enum representing the form's mode -- login or registration
*/
var modes = {
    LOGIN: 1,
    REGISTER: 2
};

/** Backbone View for the modal dialog for registering a user account with the
system and signing in to existing accounts */
var LoginForm = Backbone.View.extend({
    /** @constructor
    */
    initialize: function() {
        // Set the view's element to be the register form, which is already
        // statically included in the homepage
        this.$el = $('#register');
        // Store references to the buttons and text fields of the form
        this.fields = {
            namewrap: this.$('#namewrap'),
            doneButton: this.$('.modal-footer button'),
            loginmode: this.$('#loginmode'),
            registermode: this.$('#registermode'),
            name: this.$('#name'),
            email: this.$('#email'),
            password: this.$('#password')
        };
        // Set the mode of the form to login mode by default
        this.loginMode();
    },
    /**
    Binds events on the form's buttons and text fields to the appropriate
    event handler functions
    */
    events: {
        'click #loginmode': 'loginMode',
        'click #registermode': 'registerMode',
        'click .modal-footer button': 'onSubmit',
        'keypress #name': 'onEnter',
        'keypress #email': 'onEnter',
        'keypress #password': 'onEnter'
    },
    /**
    Sets the mode of the form to login mode. In this mode, the username field
    is hidden.
    */
    loginMode: function() {
        this.fields.namewrap.hide();
        this.fields.doneButton.text('Log in');
        this.fields.loginmode.addClass('btn-primary');
        this.fields.registermode.removeClass('btn-primary');
        this.mode = modes.LOGIN;
    },
    /**
    Sets the mode of the form to registration mode. In this mode, the username
    field is visible.
    */
    registerMode: function() {
        this.fields.namewrap.show();
        this.fields.doneButton.text('Register');
        this.fields.loginmode.removeClass('btn-primary');
        this.fields.registermode.addClass('btn-primary');
        this.mode = modes.REGISTER;
    },
    /**
    Allows the form to be submitted by pressing the enter key
    */
    onEnter: function(e) {
        if (e.charCode === 13) {
            this.onSubmit();
        }
    },
    /**
    Performs the login or registration using the supplied credentials
    */
    onSubmit: function() {
        // Read the email and password from their fields
        var data = {
            email: this.fields.email.val(),
            pass: this.fields.password.val()
        };

        // If the user is registering
        if (this.mode === modes.REGISTER) {
            // Add their chosen username to the object to be submitted
            data.name = this.fields.name.val();
            // Make the registration call
            api.register(data, utils.onLogin);
        }
        // If the user is logging in
        else {
            // Make the login call
            api.login(data, utils.onLogin);
        }

        // Return false to override the default 'Done' behaviour of closing the
        // modal -- we want to only close it if the login succeeds.
        return false;
    }
});

module.exports = LoginForm;
