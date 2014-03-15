var api = require('felina-js')();
var LoginForm = require('./loginform');

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

var setSwitcherIcon = function(page) {
    var p = pages[page];
    var icon = $('<i>').addClass('glyphicon glyphicon-' + p.icon);
    $('#switcher button').append(icon).append('&nbsp;' + p.title);
};

var onPageLoad = function(page) {
    new LoginForm();

    makeSwitcher('#switcher');
    setSwitcherIcon(page);

    webshims.polyfill();

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
    onPageLoad: onPageLoad
};
