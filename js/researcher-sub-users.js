// var fl = require('./shared/common');

$(function(){

    var i=1;

    $("#delete_row").click(function(){
       if(i>1){
        $("#addr"+(i-1)).html('');
        i--;
      }
    });

    // Capitalizes first letter of string
    function capitalize(s)
    {
        return s[0].toUpperCase() + s.slice(1);
    }

    // Deselects all elements picked in dropdown
    function multiselect_deselectAll($el) {
      $('option', $el).each(function(element) {
        $el.multiselect('deselect', $(this).val());
      });
    }



    // Adds the user to the below table
    $("#add_user").click(function(){

      var contents = $("#skinput").val();
      var name = $("#nameinput").val();
      var projects = $('#projectselect').val();

      if (contents && name) {
        $('#addr'+i).html("<td>"+ i +"</td><td><input id='skcontainer"+i+"' name='serialkey"+i+"' type='text' placeholder='Serial Key' class='form-control input-md' disabled/> </td><td><input id='namecontainer"+i+"' name='name"+i+"' type='text' placeholder='Name'  class='form-control input-md' disabled></td><td style='verticle-align:middle' align='center'>"+projects+"</td> <td style='vertical-align:middle' align='center'><a class='btn btn-default'>Invalidate User</a><a class='btn btn-default'>Refresh Token</a><a class='btn btn-default'>View Gallery</a></td>");

        $("#skcontainer"+i).val(contents);

        $("#namecontainer"+i).val(name);

        $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');

        $("#skinput").val('');
        $("#nameinput").val('');
        
        multiselect_deselectAll($("#projectselect"));

        i++;
      }
    });

    // Multiselect
     $('#projectselect').multiselect({
      buttonClass: 'btn',
      buttonWidth: '250px', //MAY NEED TO CHANGE BACK TO AUTO
      buttonText: function(options) {
        if (options.length === 0) {
          return 'None selected <b class="caret"></b>';
        }
        else if (options.length > 6) {
          return options.length + ' selected <b class="caret"></b>';
        }
        else {
          var selected = '';
          options.each(function() {
            selected += $(this).text() + ', ';
          });
          return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
        }
      },
      onChange: function(element, checked) {
        if(checked === true) {
        // action taken here if true
        }
        else if (checked === false) {
          if (confirm('Do you wish to deselect the element?')) {
          // action taken here
          }
          else {
            $("#projectselect").multiselect('select', element.val());
            return false;
          }
        }
      }
    });



});
