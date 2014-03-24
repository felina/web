var fl = require('../shared/common');

$(function(){
    fl.onPageLoad('researcher_sub_users');

    // Gets the current subusers from the system.
    var users;
    var registered_subusers;
    api.get('subuser', function (data) {
        users = data;
        // console.log(JSON.stringify(users));
        if (users.res) {
            registered_subusers = users.subusers;
            for (var a = 0; a < registered_subusers.length; a++) {

                var c = a + 1;
                var contents = registered_subusers[a].email; //THE SERIAL KEY
                var name = registered_subusers[a].name; //THE NAME
                var projects = registered_subusers[a].projectid; //THE PROJECTS
                var invalid = registered_subusers[a].invalidated; //1 if validated -1 if invalidated
                var b = c;

                $('#addr'+c).html(JST.subusers_element(
                        {c: b,
                            projects: projects}
                    ));

                if (invalid) {
                    $("#tablenu"+b).css("background-color","red");
                } else {
                    $("#tablenu"+b).css("background-color","green");
                }


                //Get the value from the serial key input
                $("#skcontainer"+b).val(contents);

                //Get the value from the name input
                $("#namecontainer"+b).val(name);

                // Refresh the user
                $("#refresh"+b).click(function(){
                    var newUser = {
                        "email": contents,
                        "refresh": 1
                    };

                    api.post('updatesub', newUser, function (data) {
                        if (data.res) {
                            //Give info about successful refresh
                        }
                    });
                });

                //Invalidate the user
                $("#invalidate"+b).click(function(){
                    var x = b;
                    var newUser1 = {
                        "email": contents,
                        "refresh": -1
                    };

                    api.post('updatesub', newUser1, function (data) {
                        console.log(JSON.stringify(data));
                        if (data.res) {
                            //Give info about successful invalidate
                            $("#tablenu"+x).css("background-color","yellow");
                        }
                    });
                });


                $("#edit"+b).click(function(){
                        $("#namecontainer"+b).removeAttr("readonly");
                });

                $('#tab_logic').append('<tr id="addr'+(c+1)+'"></tr>');
            }
        }
    });

    // Deselects all elements picked in dropdown
    function multiselect_deselectAll($el) {
        $('option', $el).each(function(element) {
            $el.multiselect('deselect', $(this).val());
        });
    }

    // Adds the user to the below table
    $("#add_user").click(function(){
        var i = $("#tab_logic > tbody > tr").length;
        var contents = $("#skinput").val() + "@felina.io"; //THE SERIAL KEY
        var name = $("#nameinput").val(); //THE NAME
        var projects = $('#projectselect').val(); //THE PROJECTS

        // api.post('subuser', function (data) {}
        // Makes sure that there is values added in the three fields
        if (contents && name && projects) {
            // JSON object to send to server
            var newUser = {
                "name": name,
                "email": contents,
                "projectid": 1
            };

             api.post('subuser', newUser, function (data) {
                if (data.res) {
                    // Send info to server
                    var e = i;


                    //ADD EDIT AND TOGGLE TO SUBMIT AND CANCEL BUTTONS
                    $('#addr'+i).html(JST.subusers_element(
                        {c: i,
                        projects: projects}
                    ));

                    $("#skcontainer"+i).val(contents);

                    $("#namecontainer"+i).val(name);

                    $("#edit"+e).click(function(){
                            $("#namecontainer"+e).removeAttr("readonly");
                            console.log(i);
                    });


                    $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');

                    $("#skinput").val('');
                    $("#nameinput").val('');

                    multiselect_deselectAll($("#projectselect"));

                    i++;
                }
                // Add clause if users is already defined etc........
             });
        }
    });

    $('#projectselect').multiselect({
        buttonClass: 'btn',
        buttonWidth: '250px', //MAY NEED TO CHANGE BACK TO AUTO
        enableFiltering: true,
        onChange: function(option, checked) {
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
