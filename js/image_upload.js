Dropzone.options.filedrop = {
    // maxFilesize: 4096,
    init: function () {
        this.on("addedfile", function (file) {
            console.log(file);
        });
    }
};

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

    var data = [
        {
            url: '/img/elephant.jpg',
            title: 'Elephant'
        },
        {
            url: '/img/giraffe.jpg',
            title: 'Giraffe'
        },
        {
            url: '/img/leopard.jpg',
            title: 'Leopard'
        }
    ];

    var list = $('tbody');
    var gallery = $('#gallery');

    for(var i = 0; i < data.length; i++){
        var d = data[i];
        d.id = i;
        gallery.append(JST.gallery_item(d));
        list.append(JST.annotator_item(d));
    }

    $('.gallery-item input').on('change', function(e){
        var id = $(this).attr('data-id');
        $('tr[data-id=' + id + ']').toggle();
    });
});
