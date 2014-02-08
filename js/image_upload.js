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

    var map = new GMaps({
        div: '#map',
        lat: 0,
        lng: 0,
        zoom: 2,
        width: 500,
        height: 300,
        resize: function(){
            var center = map.getCenter();
            map.setCenter(center.lat(), center.lng());
        }
    });

    $('#map-modal').on('shown.bs.modal', function(e){
        map.refresh();
    });

    $('#submit').click(function(evt){
        var data = [];

        var rows = $('#photos tbody').children();

        // Iterate through each row in the table of annotated images
        for(var i = 0; i < rows.length; i++){
            var row = $(rows[i]);

            if(row.is(':visible')){
                 // Grab the current row's metadata from the DOM
                var image = {
                    url: row.find('img').attr('src'),
                    title: row.find('.title-field').val(),
                    time: row.find('.time-field').val(),
                    date: row.find('.date-field').val(),
                    location: row.find('.location-field').val()
                };

                // Add it to the list of metadata
                data.push(image);
            }
        }

        console.log(data);

        if(data.length === 0){
            alert("No images selected. Please select at least one image to upload.");
            return;
        }

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

    var data = ['/img/elephant.jpg', '/img/giraffe.jpg', '/img/leopard.jpg'];

    for(var i = 0; i < data.length; i++){
        data[i] = {
            url: data[i],
            title: data[i]
        };
    }

    var list = $('tbody');
    var gallery = $('#gallery');

    // Iterate through the list of uploaded images
    for(var i = 0; i < data.length; i++){
        var d = data[i];

        // Render a gallery thumbnail with the current image
        var g = $(JST.gallery_item(d));
        // Render an annotator table row with the current image
        var a = $(JST.annotator_item(d));

        // Bind an event to the checkbox in the current gallery item to add
        // its image to the list of images to be annotated
        g.find('input').on('change', (function(row){
            return function(e){
                row.toggle();
            };
        })(a));

        // Bind an event to the annotate button in this image's row in the table
        // that launches the annotator modal and updates the annotator with the
        // current image
        a.find('.annotator-opener').on('click', (function(url){
            return function(e){
                $('#annotator-container').annotator(url, 400, 400);
            };
        })(d.url));

        // Add the thumbnail to the gallery and the row to the table
        gallery.append(g);
        list.append(a);
    }
});
