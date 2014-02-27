// Initialises the Google Map for location picking
var makeMap = function() {
    var map = new GMaps({
        div: '#map',
        lat: 0,
        lng: 0,
        zoom: 2,
        click: function(e) {
            console.log(e);
            map.removeMarkers();
            map.addMarker({
                lat: e.latLng.d,
                lng: e.latLng.e
            });
        }
    });

    $('.location-saver').on('click', function() {
        if (map.markers.length === 0) {
            alert('Please choose a location');
            return;
        }
        var pos = map.markers[0].position;

        GMaps.geocode({
            lat: pos.d,
            lng: pos.e,
            callback: function(results, status) {
                if (status === "OK") {
                    $('.location-field').val(results[0].formatted_address);
                }
            }
        });
    });

    $('.geolocator').on('click', function() {
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
var sendImageData = function(data) {
    $.ajax({
        type: 'POST',
        url: fl.server + 'upload/img',
        data: data,
        dataType: 'JSON',
        success: function(d) {
            console.log(d);
        }
    });
};

// Dummy features data for the annotator
// TODO: replace this with data from the server. Requires https://github.com/felina/server/issues/29
fl.features = [{
    name: "tail",
    required: false,
    shape: "poly"
}, {
    name: "eyes",
    required: true,
    shape: "rect"
}, {
    name: "feet",
    required: true,
    shape: "rect"
}, {
    name: "neck",
    required: false,
    shape: "poly"
}, {
    name: "nose",
    required: true,
    shape: "any"
}];

// Stores metadata of uploaded images
var images = [];

// Stores all currently entered image metadata, including text fields, map
// location and annotations
var save = function() {
    var i = fl.active_index;

    // If a location has been chosen on the map, store it
    var coords = null;
    if (fl.map.markers.length > 0) {
        var pos = fl.map.markers[0].position;
        // Great variable names here GMaps.js cheers for that
        coords = {
            lat: pos.d,
            lng: pos.e
        };
    }

    var time = $('.time-field').val() || '00:00:00';

    images[i].metadata = {
        // Store the contents of all text fields
        title: $('.title-field').val(),
        datetime: new Date($('.date-field').val() + 'T' + time),
        // Store the map location
        location: {
            name: $('.location-field').val(),
            coords: coords
        }
    };

    // Store all annotator data
    images[i].annotations = fl.annotator.getExport();
};

// Creates or updates the annotator element with the given image and its
// annotations
var makeAnnotator = function(img) {
    var args = {
        width: 500,
        height: 500,
        features: fl.features,
        style: {
            classes: 'btn btn-default'
        }
    };

    if (img) {
        args.src = img.url;
        args.annotations = img.annotations;
    }

    fl.annotator = $('#annotator').annotator(args);
};

// Loads the saved image data at the given index and puts it back in the DOM
var restore = function(i) {
    var img = images[i];
    var meta = img.metadata;
    var coords = meta.location.coords;

    fl.active_index = i;

    // Get the ISO standard date representation in the format
    // "YYYY-MM-DDTHH:mm:SS.nnnZ"
    var isoString = meta.datetime.toISOString();
    // Split into the date and time components
    var parts = isoString.split('T');
    var date = parts[0];
    // Remove milliseconds from time
    var time = parts[1].split('.')[0];

    // Update the text fields with the selected image's metadata
    $('.title-field').val(meta.title);
    $('.time-field').val(time);
    $('.date-field').val(date);
    $('.location-field').val(meta.location.name);

    // Update the annotator with the selected image's annotations
    makeAnnotator(img);

    // Clear old markers
    fl.map.removeMarkers();
    // Update the map with the selected image's location if one has been set
    if (coords && coords.lat && coords.lng) {
        fl.map.addMarker(coords);
    }
};

// Called when the user picks an image from the gallery to annotate
var onPick = function(i) {
    return function() {
        save();
        restore(i);
    };
};

// Called when the user ticks an image from the gallery to be uploaded
var onSelect = function(i, el) {
    return function() {
        images[i].selected = !images[i].selected;
        el.toggleClass('active');
    };
};

var makeMetadata = function(file) {
    return {
        selected: false,
        url: file.name,
        metadata: {
            title: file.name,
            datetime: new Date(),
            location: {
                name: 'Unknown',
                coords: null
            }
        },
        annotations: {}
    };
};

var makeImage = function(file) {
    var img = $('<img>')[0];
    var reader = new FileReader();
    img.file = file;
    reader.onload = (function(aImg) {
        return function(e) {
            aImg.src = e.target.result;
        };
    })(img);
    reader.readAsDataURL(file);
    return $(img);
};

var addImage = function(file) {
    var image = makeMetadata(file);

    // Render a gallery thumbnail with the current image
    var thumbnail = $(JST.gallery_item(image));
    var i = images.length;

    thumbnail.find('a').append(
        makeImage(file).attr('alt', image.metadata.title)
    );

    // Bind an event to the checkbox in the current gallery item to add
    // its image to the list of images to be annotated
    thumbnail.find('input').on('change', onSelect(i, thumbnail));

    thumbnail.find('.picker').on('click', onPick(i));

    // Add the thumbnail to the gallery
    $('#gallery').append(thumbnail);
    images.push(image);
};

Dropzone.options.dropimg = {
    url: fl.server + 'upload/img',
    acceptedFiles: 'image/*',
    maxFilesize: 4096,
    accept: function(file, done) {
        console.log(file, done);
        addImage(file);
    }
};

$(function() {
    fl.setSwitcherIcon('upload/image');

    makeAnnotator({
        url: '/img/user.png',
        annotations: {}
    });

    // Initialise the Google map
    makeMap();

    // Send the image metadata to the server when the submit button is clicked
    $('#submit').click(function() {
        // Remove all unchecked images
        var data = images.filter(function(img) {
            return img.selected;
        });

        // Require at least one image to be selected
        if (data.length === 0) {
            alert("No images selected. Please select at least one image to upload.");
            return;
        }

        sendImageData(data);
    });

    fl.active_index = 0;
});
