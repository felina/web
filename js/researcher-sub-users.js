// $(document).ready
$(function(){
      var i=1;
     $("#add_row").click(function(){
      $('#addr'+i).html("<td>"+ (i+1) +"</td><td><input name='serialkey"+i+"' type='text' placeholder='Serial Key' class='form-control input-md'  /> </td><td><input  name='name"+i+"' type='text' placeholder='Name'  class='form-control input-md'></td> <td><a class='btn btn-default'>Invalidate User</a><a class='btn btn-default'>Refresh Token</a><a class='btn btn-default'>View Gallery</a></td>");

      $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
      i++; 
    });
     
    $("#delete_row").click(function(){
    	 if(i>1){
		    $("#addr"+(i-1)).html('');
		    i--;
		  }
	  });
});