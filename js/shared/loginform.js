var fl = require('./common');
var api = require('felina-js')();

var modes = {
    LOGIN: 1,
    REGISTER: 2
};

module.exports = Backbone.View.extend({
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

        this.fields.loginmode.trigger('click');

        this.mode = modes.LOGIN;
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
            this.$el.modal('hide');

            // Update the header to replace the login button with the
            // details of the newly logged in user
            fl.makeHeader(data);
        }
        // Login failed
        else {
            // Inform the user
            alert('Invalid username or password');
            console.log(data);
        }
    }
});
