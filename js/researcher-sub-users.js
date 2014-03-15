// $(document).ready
$(function(){
    
    var i=1;
     
    $("#delete_row").click(function(){
    	 if(i>1){
		    $("#addr"+(i-1)).html('');
		    i--;
		  }
	  });

    // Adds the user to the below table
    $("#add_user").click(function(){

      var contents = $("#skinput").val();
      var name = $("#nameinput").val();


      $('#addr'+i).html("<td>"+ i +"</td><td><input id='skcontainer"+i+"' name='serialkey"+i+"' type='text' placeholder='Serial Key' class='form-control input-md' disabled/> </td><td><input id='namecontainer"+i+"' name='name"+i+"' type='text' placeholder='Name'  class='form-control input-md' disabled></td> <td style='vertical-align:middle' align='center'><a class='btn btn-default'>Invalidate User</a><a class='btn btn-default'>Refresh Token</a><a class='btn btn-default'>View Gallery</a></td>");

      $("#skcontainer"+i).val(contents);

      $("#namecontainer"+i).val(name);

      $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
      
      $("#skinput").val('');
      $("#nameinput").val('');
      i++; 
    });


}); 