if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

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

module.exports = {
    isHomepage: isHomepage,
    goHome: goHome
};
