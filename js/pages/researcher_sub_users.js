var fl = require('../shared/common');
var SubuserView = require('../views/subuser');

$(function(){
    fl.onPageLoad('researcher_sub_users');

    // Gets the current subusers from the system.
    var registered_subusers;
    api.getSubuser(function (users) {
        if (users.res) {
            registered_subusers = users.subusers;
            registered_subusers.forEach(function(user, i){
                var contents = user.email; //THE SERIAL KEY
                var name = user.name; //THE NAME
                var projects = user.projectid; //THE PROJECTS
                var invalid = user.invalidated; //1 if validated -1 if invalidated

                var subuser_view = new SubuserView({
                    i: i,
                    projects: projects,
                    invalid: invalid,
                    name: name,
                    contents: contents
                });

                subuser_view.render('#tab_logic tbody');
            });
        }
    });

    // Deselects all elements picked in dropdown
    function multiselect_deselectAll($el) {
        $('option', $el).each(function() {
            $el.multiselect('deselect', $(this).val());
        });
    }

    // Adds the user to the below table
    $('#add_user').click(function(){
        var i = $('#tab_logic > tbody > tr').length;
        var contents = $('#skinput').val() + '@felina.com'; //THE SERIAL KEY
        var name = $('#nameinput').val(); //THE NAME
        var projects = $('#projectselect').val(); //THE PROJECTS

        // Makes sure that there is values added in the three fields
        if (contents && name && projects) {
            // JSON object to send to server
            var newUser = {
                name: name,
                email: contents,
                projectid: 1
            };

             api.putSubuser(newUser, function (data) {
                if (data.res) {
                    var subuser_view = new SubuserView({
                        i: i,
                        projects: projects,
                        invalid: 1,
                        name: name,
                        contents: contents
                    });

                    subuser_view.render('#tab_logic tbody');

                    $('#skinput').val('');
                    $('#nameinput').val('');

                    multiselect_deselectAll($('#projectselect'));
                    i++;
                }
                // Add clause if users is already defined etc........
            });
        }
    });

    $('#projectselect').multiselect({
        buttonClass: 'btn',
        // MAY NEED TO CHANGE BACK TO AUTO
        buttonWidth: '250px',
        enableFiltering: true,
        onChange: function(option) {
            var values = [];
            $('#projectselect option').each(function() {
                if ($(this).val() !== option.val()) {
                    values.push($(this).val());
                }
            });
            $('#projectselect').multiselect('deselect', values);
        }
    });
});
