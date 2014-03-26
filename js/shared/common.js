var LoginForm = require('../views/loginform');
var Switcher = require('../views/switcher');
var makeHeader = require('./loginutils').makeHeader;

var pages = require('../../data/pages');

var onPageLoad = function(page) {
    new LoginForm();

    var switcher = new Switcher({
        pages: pages
    });
    switcher.render('#hleft');
    switcher.setIcon(page);

    webshims.polyfill();

    // Check the user's status on page load so that their name and icon can be
    // displayed in the header
    api.loginCheck(function(data) {
        console.log(data);
        makeHeader(data);
    });
};

module.exports = {
    onPageLoad: onPageLoad
};
