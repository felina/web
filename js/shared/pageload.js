var Switcher = require('../views/switcher');
var loginutils = require('./loginutils');
var pages = require('../../data/pages');
var makeHeader = loginutils.makeHeader;
var isHomepage = loginutils.isHomepage;
var goHome = loginutils.goHome;

var onPageLoad = function(page) {
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
        if (data.res || isHomepage()) {
            makeHeader(data);
        }
        else {
            // Redirect to homepage
            if (!isHomepage()) {
                goHome();
            }
        }
    });
};

module.exports = onPageLoad;
