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

    $('.container').append(JST.footer());

    $('#submit').click(function(evt){
        var data = [];

        var rows = $('#photos tbody').children();

        for(var i = 0; i < rows.length; i++){
            var row = $(rows[i]);

            var image = {
                url: row.find('img').attr('src'),
                time: row.find('.time-field').val(),
                date: row.find('.date-field').val(),
                location: row.find('.location-field').val()
            };

            data.push(image);
        }

        console.log(data);

        $.ajax({
            type: 'POST',
            url: server + 'upload/img',
            data: data,
            dataType: 'JSON',
            success: function(data){
                console.log(data);
            }
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
