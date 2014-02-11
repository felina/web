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

// Initialises the Google Map for location picking
var makeMap = function(){
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
};

// Loads the image metadata from the DOM and returns as an array of objects
var getImageData = function(){
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

    return data;
};

// Sends the image metadata to the server
// TODO: this endpoint doesn't work
var sendImageData = function(data){
    $.ajax({
        type: 'POST',
        url: fl.server + 'upload/img',
        data: data,
        dataType: 'JSON',
        success: function(d){
            console.log(d);
        }
    });
};

// Function factories

// Returns a function which creates an annotator with the given image
var annotatorFactory = function(url){
    return function(){
        $('#annotator-container').annotator({
            src: url,
            width: modalWidth,
            height: modalHeight,
            features: fl.features
        });
    };
};

// Returns a function that updates the record of the current row for use by the map
var mapFactory = function(row){
    return function(){ fl.active_row = row; };
};

// Returns a function which toggles the given row visibility
var rowFactory = function(row){
    return function(){
        row.toggle();
    };
};

// Dummy features data for the annotator
// TODO: replace this with data from the server
fl.features = [
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

// Dummy image data to be annotated
// TODO: get this from the files uploaded to Dropzone
var images = ['/img/elephant.jpg', '/img/giraffe.jpg', '/img/leopard.jpg'];
for(var i = 0; i < images.length; i++){
    images[i] = {
        url: images[i],
        title: images[i]
    };
}

$(function(){
    fl.setSwitcherIcon('upload/image');

    var list = $('tbody');
    var gallery = $('#gallery');

    // Initialise the Google Map
    makeMap();

    // Send the image metadata to the server when the submit button is clicked
    $('#submit').click(function(){
        var data = getImageData();

        if(data.length === 0){
            alert("No images selected. Please select at least one image to upload.");
            return;
        }

        sendImageData(data);
    });

    // Iterate through the list of uploaded images
    for(var i = 0; i < images.length; i++){
        var image = images[i];

        // Render a gallery thumbnail with the current image
        var thumbnail = $(JST.gallery_item(image));
        // Render an annotator table row with the current image
        var row = $(JST.annotator_item(image));

        // Bind an event to the checkbox in the current gallery item to add
        // its image to the list of images to be annotated
        thumbnail.find('input').on('change', rowFactory(row));

        // Bind an event to the annotate button in this image's row in the table
        // that launches the annotator modal and updates the annotator with the
        // current image
        row.find('.annotator-opener').on('click', annotatorFactory(image.url));

        // Bind an event to the map picker button that launches the map modal
        // to pick a location for the current image
        row.find('.map-opener').on('click', mapFactory(row));

        // Add the thumbnail to the gallery and the row to the table
        gallery.append(thumbnail);
        list.append(row);
    }
});
