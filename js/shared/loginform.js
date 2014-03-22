var api = require('felina-js')();
var utils = require('./loginutils');

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
            api.register(data, utils.onLogin);
        }
        else {
            api.login(data, utils.onLogin);
        }

        // Return false to override the default 'Done' behaviour of closing the
        // modal -- we want to only close it if the login succeeds.
        return false;
    }
});

module.exports = LoginForm;
