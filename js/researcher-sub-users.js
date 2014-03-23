var fl = require('./shared/common');
var api = require('felina-js')();

$(function(){


    // $("#delete_row").click(function(){
    //    if(i>1){
    //     $("#addr"+(i-1)).html('');
    //     i--;
    //   }
    // });


    var users;
    var registered_subusers;
    api.get('subuser', function (data) {
      users = data;
      console.log(JSON.stringify(users));
      if (users.res) {
        registered_subusers = users.subusers;
      }


      for (var a = 0; a < registered_subusers.length; a++) {
        
        var c = a + 1;
        var contents = registered_subusers[a].email; //THE SERIAL KEY
        var name = registered_subusers[a].name; //THE NAME
        var projects = registered_subusers[a].projectid; //THE PROJECTS


        var b = c;

        $('#addr'+c).html("<td>"+ c +"</td><td><input id='skcontainer"+c+"' name='serialkey"+c+"' type='text' placeholder='Serial Key' class='form-control input-md' disabled/> </td><td><input id='namecontainer"+c+"' name='name"+c+"' type='text' placeholder='Name'  class='form-control input-md' disabled></td><td style='verticle-align:middle' align='center'><a class='btn btn-default'>"+projects+"</a></td> <td style='vertical-align:middle' align='center'><a class='btn btn-default'>Invalidate User</a><a class='btn btn-default'>Refresh Token</a><a class='btn btn-default'>View Gallery</a><a id='edit"+c+"' class='btn btn-default' data-toggle='button'>Edit</a></td>");

        $("#skcontainer"+c).val(contents);

        $("#namecontainer"+c).val(name);

        $("#edit"+b).click(function(){
            $("#namecontainer"+b).removeAttr("disabled");
        });


        $('#tab_logic').append('<tr id="addr'+(c+1)+'"></tr>');
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

      // Makes sure that there is values added in the three fields
      if (contents && name && projects) {

        // Send info to server
        var e = i;


        //ADD EDIT AND TOGGLE TO SUBMIT AND CANCEL BUTTONS
        $('#addr'+i).html("<td>"+ i +"</td><td><input id='skcontainer"+i+"' name='serialkey"+i+"' type='text' placeholder='Serial Key' class='form-control input-md' disabled/> </td><td><input id='namecontainer"+i+"' name='name"+i+"' type='text' placeholder='Name'  class='form-control input-md' disabled></td><td style='verticle-align:middle' align='center'><a class='btn btn-default'>"+projects+"</a></td> <td style='vertical-align:middle' align='center'><a class='btn btn-default'>Invalidate User</a><a class='btn btn-default'>Refresh Token</a><a class='btn btn-default'>View Gallery</a><a id='edit"+i+"' class='btn btn-default' data-toggle='button'>Edit</a></td>");

        $("#skcontainer"+i).val(contents);

        $("#namecontainer"+i).val(name);

        $("#edit"+e).click(function(){
            $("#namecontainer"+e).removeAttr("disabled");
            console.log(i);
        });


        $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');

        $("#skinput").val('');
        $("#nameinput").val('');
        
        multiselect_deselectAll($("#projectselect"));

        i++;
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
