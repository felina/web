Dropzone.options.filedrop = {
    // maxFilesize: 4096,
    init: function () {
        this.on("addedfile", function (file) {
            console.log(file);
        });
    }
};

$(function(){
    $('.container').append(JST.footer());

    $('#submit').click(function(evt){
        var data = [];

        var rows = $('#photos tbody').children();

        // Iterate through each row in the table of annotated images
        for(var i = 0; i < rows.length; i++){
            var row = $(rows[i]);

            // Grab the current row's metadata from the DOM
            var image = {
                url: row.find('img').attr('src'),
                time: row.find('.time-field').val(),
                date: row.find('.date-field').val(),
                location: row.find('.location-field').val()
            };

            // Add it to the list of metadata
            data.push(image);
        }

        console.log(data);

        // Send this data off to the server
        // TODO: this endpoint doesn't work
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

    // Iterate through the list of uploaded images
    for(var i = 0; i < data.length; i++){
        var d = data[i];
        // Assign each image an ID to refer to it on the page
        d.id = i;

        // Render a gallery thumbnail with the current image
        var g = $(JST.gallery_item(d));
        // Render an annotator table row with the current image
        var a = $(JST.annotator_item(d));

        // Bind an event to the checkbox in the current gallery item to add
        // its image to the list of images to be annotated
        g.find('input').on('change', function(e){
            var id = $(this).attr('data-id');
            $('tr[data-id=' + id + ']').toggle();
        });

        // Create a function that updates the annotator modal to use the
        // current image
        var setAnnotator = (function(url){
            return function(e){
                console.log(e);
                $('#annotator-container').annotator(url, 400, 400);
            };
        })(d.url);

        // Bind an event to the annotate button in this image's row in the table
        // that launches the annotator modal and updates the annotator with the
        // current image
        a.find('button').on('click', setAnnotator);

        // Add the thumbnail to the gallery and the row to the table
        gallery.append(g);
        list.append(a);
    }
});
