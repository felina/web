var goHome = function() {
    window.location.replace(window.location.origin);
};

var isHomepage = function() {
    return window.location.href === window.location.origin + '/';
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

    // Hide the switcher if the user isn't logged in so that unauthorized
    // users can't access other areas of the site.
    $('#switcher').toggle(data.res);

    // Add the new content to the header
    $('header').append(h);
};

var onLogin = function(data) {
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
};

module.exports = {
    makeHeader: makeHeader,
    onLogin: onLogin,
    isHomepage: isHomepage,
    goHome: goHome
};
