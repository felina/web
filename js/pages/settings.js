var onPageLoad = require('../shared/pageload');

$(function(){
    onPageLoad('settings');

    // When the user clicks the save button
    $('#save').on('click', function(e) {
        // Override default button press action
        e.preventDefault();

        // Grab the new details they've provided
        var user = {
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val()
        };

        // Make a call to the server to update the user's details
        api.updateUser(user, function(data) {
            // Display a message informing the user if the update was sucessful
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
