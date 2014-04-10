var onPageLoad = require('../shared/pageload');

$(function(){
    onPageLoad('settings');

    $('#save').on('click', function(e) {
        e.preventDefault();

        var user = {
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val()
        };

        api.updateUser(user, function(data) {
            if (data.res) {
                alert('Settings updated successfully');
            }
            else {
                alert('Could not save settings');
                console.error(data);
            }
        });
    });
});
