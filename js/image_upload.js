$(function(){
    $('#annotator-container').annotator('/img/elephant.jpg');

    $('#submit').click(function(evt){
        $.ajax({
            type: 'POST',
            url: 'http://ec2-54-194-128-44.eu-west-1.compute.amazonaws.com/upload/img',
            data: {
                uploaded1: 'test.png'
            },
            success: function(){

            }
            // dataType: dataType
        });
    });

    var data = [1, 2, 3];

    var list = $('tbody');
    var gallery = $('#links');

    for(var i = 0; i < data.length; i++){
        gallery.append(JST.gallery_item({
            url: '/img/elephant.jpg',
            title: 'Elephant'
        }));
        list.append(JST.annotator_item());
    }
});
