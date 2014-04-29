var loginutils = require('./loginutils');
var Header = require('../views/header');
var isHomepage = loginutils.isHomepage;
var goHome = loginutils.goHome;

var onPageLoad = function(page) {
    webshims.polyfill();

    // Check the user's status on page load so that their name and icon can be
    // displayed in the header
    api.loginCheck(function(data) {
        console.log(data);
        if (data.res || isHomepage()) {
            var header = new Header({
                page: page
            });
            header.render().$el.prependTo('body');
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
