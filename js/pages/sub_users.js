var onPageLoad = require('../shared/pageload');
var SubuserView = require('../views/subuser');
var AddButton = require('../views/buttons/add');
var RemoveButton = require('../views/buttons/remove');

$(function(){
    onPageLoad('sub_users');

    var subusers = [];

    // Gets the current subusers from the system.
    var registered_subusers;
    api.getSubuser(function (users) {
        if (users.res) {
            registered_subusers = users.subusers;
            registered_subusers.forEach(function(user, i){
                var contents = user.email;
                var name = user.name;
                var projects = user.projectid;
                var valid = user.valid;

                var subuser_view = new SubuserView({
                    i: i,
                    projects: projects,
                    valid: valid,
                    name: name,
                    contents: contents
                });

                subuser_view.render('#tab_logic tbody');

                subusers.push(subuser_view);
            });
        }
    });

    // Deselects all elements picked in dropdown
    function multiselect_deselectAll($el) {
        $('option', $el).each(function() {
            $el.multiselect('deselect', $(this).val());
        });
    }

    var getSelected = function() {
        return subusers.filter(function(subuser) {
            return subuser.selected;
        });
    };

    var invalidate = function() {
        var s = getSelected();
        s.forEach(function(subuser){
            subuser.invalidate();
        });
    };

    var invalidateButton = new RemoveButton({
        text: 'Invalidate',
        onClick: invalidate
    });

    invalidateButton.render().$el.appendTo('#controls');

    $('#refresh').on('click', function(e) {
        e.preventDefault();
        var s = getSelected();
        s.forEach(function(subuser){
            subuser.refresh();
        });
    });

    $('#edit').on('click', function(e) {
        e.preventDefault();
        var s = getSelected();
        s.forEach(function(subuser){
            subuser.edit();
        });
    });

    // Adds the user to the below table
    var addUser = function() {
        var i = $('#tab_logic > tbody > tr').length;
        var contents = $('#skinput').val() + '@felina.com';
        var name = $('#nameinput').val();
        var projects = $('#projectselect').val();

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
                        valid: false,
                        name: name,
                        contents: contents
                    });

                    subusers.push(subuser_view);

                    subuser_view.render('#tab_logic tbody');

                    $('#skinput').val('');
                    $('#nameinput').val('');

                    multiselect_deselectAll($('#projectselect'));
                    i++;
                }
                // Add clause if users is already defined etc........
            });
        }
    };

    var addUserButton = new AddButton({
        onClick: addUser,
        text: 'Add user'
    });

    addUserButton.render().$el.appendTo('#addwrap');

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
