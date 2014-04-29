var isHomepage = function() {
    return window.location.href === window.location.origin + '/';
};

var goHome = function() {
    if (isHomepage()) {
        window.location.reload(true);
    }
    else {
        window.location.replace(window.location.origin);
    }
};

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
            goHome();
        });
    });

    // Add the new content to the header
    $('header').append(h);
};

module.exports = {
    makeHeader: makeHeader,
    isHomepage: isHomepage,
    goHome: goHome
};
