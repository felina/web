var LoginForm = require('../views/loginform');
var makeHeader = require('./loginutils').makeHeader;

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
