Dropzone.options.filedrop = {
    // maxFilesize: 4096,
    init: function () {
        this.on("addedfile", function (file) {
            console.log(file);
        });
    }
};

// Initialises the Google Map for location picking
var makeMap = function(){
     var map = new GMaps({
        div: '#map',
        lat: 0,
        lng: 0,
        zoom: 2,
        click: function(e){
            console.log(e);
            map.removeMarkers();
            map.addMarker({
                lat: e.latLng.d,
                lng: e.latLng.e
            });
        }
    });

    $('.location-saver').on('click', function(){
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
                    $('.location-field').val(results[0].formatted_address);
                }
            }
        });
    });

    $('.geolocator').on('click', function(){
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

    fl.map = map;
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
var images = [
    {
        url: '/img/elephant.jpg',
        metadata: {
            title: 'Elephant',
            time: '19:21:00',
            date: '2012-06-01',
            location: {
                name: 'Africa',
                coords: {
                    lat: 0,
                    lng: 0
                }
            }
        },
        annotations: {}
    },
    {
        url: '/img/giraffe.jpg',
        metadata: {
            title: 'Giraffe',
            time: '19:21:00',
            date: '2012-06-01',
            location: {
                name: 'Africa',
                coords: {
                    lat: 0,
                    lng: 0
                }
            }
        },
        annotations: {}
    },
    {
        url: '/img/leopard.jpg',
        metadata: {
            title: 'Leopard',
            time: '19:21:00',
            date: '2012-06-01',
            location: {
                name: 'Africa',
                coords: {
                    lat: 0,
                    lng: 0
                }
            }
        },
        annotations: fl.features
    }
];

var onPick = function(i){
    return function(){
        var img = images[i];
        var meta = img.metadata;

        fl.active_index = i;

        // Update the text fields with the selected image's metadata
        $('.title-field').val(meta.title);
        $('.time-field').val(meta.time);
        $('.date-field').val(meta.date);
        $('.location-field').val(meta.location.name);

        // Update the annotator with the selected image's annotations
        $('#annotator').annotator({
            src: img.url,
            features: img.annotations
        });

        // Update the map with the selected image's location
        if(meta.location.coords){
            fl.map.removeMarkers();
            fl.map.addMarker({
                lat: meta.location.coords.lat,
                lng: meta.location.coords.lng
            });
        }
    };
};

var onSave = function(){
    var i = fl.active_index;

    var coords = null;

    if(fl.map.markers.length > 0){
        coords = {
            lat: fl.map.markers[0].lat,
            lng: fl.map.markers[0].lng
        };
    }

    images[i].metadata = {
        title: $('.title-field').val(),
        time: $('.time-field').val(),
        date: $('.date-field').val(),
        location: {
            name: $('.location-field').val(),
            coords: coords
        }
    };

    images[i].annoations = fl.features;
};

$(function(){
    fl.setSwitcherIcon('upload/image');

    var gallery = $('#gallery');

    // Initialise the Google Map
    makeMap();

    // Send the image metadata to the server when the submit button is clicked
    $('#submit').click(function(){
        var data = images.filter(function(img){ return img.selected; });

        if(data.length === 0){
            alert("No images selected. Please select at least one image to upload.");
            return;
        }

        sendImageData(data);
    });

    $('#annotator').annotator({
        src: '/img/elephant.jpg',
        width: 500,
        height: 500,
        features: fl.features
    });

    // Iterate through the list of uploaded images
    for(var i = 0; i < images.length; i++){
        var image = images[i];

        // Render a gallery thumbnail with the current image
        var thumbnail = $(JST.gallery_item(image));

        // Bind an event to the checkbox in the current gallery item to add
        // its image to the list of images to be annotated
        thumbnail.find('input').on('change');

        thumbnail.find('.picker').on('click', onPick(i));

        // Add the thumbnail to the gallery and the row to the table
        gallery.append(thumbnail);
    }

    $('.data-saver').on('click', onSave);
});
