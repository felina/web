Dropzone.options.filedrop = {
    // maxFilesize: 4096,
    init: function () {
        this.on("addedfile", function (file) {
            console.log(file);
        });
    }
};

var modalWidth = 800;
var modalHeight = 500;

$(function(){
    var i;
    fl.setSwitcherIcon('upload/image');

    var map = new GMaps({
        div: '#map',
        lat: 0,
        lng: 0,
        zoom: 2,
        width: modalWidth,
        height: modalHeight,
        click: function(e){
            console.log(e);
            map.removeMarkers();
            map.addMarker({
                lat: e.latLng.d,
                lng: e.latLng.e
            });
        }
    });

    var mapModal = $('#map-modal');

    mapModal.on('shown.bs.modal', function(){
        map.refresh();
    });
    mapModal.find('.modal-footer button').on('click', function(){
        if(map.markers.length === 0){
            alert('Please choose a location');
            return;
        }
        var pos = map.markers[0].position;

        GMaps.geocode({
            lat: pos.d,
            lng: pos.e,
            callback: function(results, status) {
                if(status === "OK"){
                    fl.active_row.find('.location-field').val(results[0].formatted_address);
                }
            }
        });
    });

    mapModal.find('.geolocator').on('click', function(){
        GMaps.geolocate({
            success: function(position) {
                map.setCenter(position.coords.latitude, position.coords.longitude);
                map.setZoom(12);
            },
            error: function(error) {
                alert('Geolocation failed: ' + error.message);
            },
            not_supported: function() {
                alert("Your browser does not support geolocation");
            }
        });
    });

    $('#submit').click(function(){
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
            url: fl.server + 'upload/img',
            data: data,
            dataType: 'JSON',
            success: function(data){
                console.log(data);
            }
        });
    });

    var data = ['/img/elephant.jpg', '/img/giraffe.jpg', '/img/leopard.jpg'];

    for(i = 0; i < data.length; i++){
        data[i] = {
            url: data[i],
            title: data[i]
        };
    }

    var list = $('tbody');
    var gallery = $('#gallery');


    var features = [
        {
            name: "tail",
            required: false,
            shape: "poly"
        },
        {
            name: "eyes",
            required: true,
            shape: "rect"
        },
        {
            name: "feet",
            required: true,
            shape: "rect"
        },
        {
            name: "neck",
            required: false,
            shape: "poly"
        },
        {
            name: "nose",
            required: true,
            shape: "any"
        }
    ];

    var annotatorFactory = function(url){
        return function(){
            $('#annotator-container').annotator({
                src: url,
                width: modalWidth,
                height: modalHeight,
                features: features
            });
        };
    };

    var mapFactory = function(row){
        return function(){ fl.active_row = row; };
    };

    var rowFactory = function(row){
        return function(){
            row.toggle();
        };
    };

    // Iterate through the list of uploaded images
    for(i = 0; i < data.length; i++){
        var d = data[i];

        // Render a gallery thumbnail with the current image
        var g = $(JST.gallery_item(d));
        // Render an annotator table row with the current image
        var a = $(JST.annotator_item(d));

        // Bind an event to the checkbox in the current gallery item to add
        // its image to the list of images to be annotated
        g.find('input').on('change', rowFactory(a));

        // Bind an event to the annotate button in this image's row in the table
        // that launches the annotator modal and updates the annotator with the
        // current image
        a.find('.annotator-opener').on('click', annotatorFactory(d.url));

        a.find('.map-opener').on('click', mapFactory(a));

        // Add the thumbnail to the gallery and the row to the table
        gallery.append(g);
        list.append(a);
    }
});
