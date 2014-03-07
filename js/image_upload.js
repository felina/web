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

var getFeatures = function() {
    $.get(fl.server + 'features', function(data) {
        if (data.res) {
            fl.features = data.features;

            makeAnnotator({
                url: '/img/user.png',
                annotations: {}
            });
        }
    });
};

var addSpecies = function(){
    var list = $('#species-list');

    $.get(fl.server + 'species', function(data){
        if (data.res) {
            for (var i = 0; i < data.species.length; i++) {
                var specie = data.species[i];
                $('<option>')
                    .attr('value', specie)
                    .text(specie)
                    .appendTo(list);
            }
        }
    });
};

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
    var date = $('.date-field').val() || '2000-01-01';
    var datetime = new Date(date + 'T' + time);

    images[i].metadata = {
        // Store the contents of all text fields
        title: $('.title-field').val(),
        datetime: datetime,
        // Store the map location
        location: {
            name: $('.location-field').val(),
            coords: coords
        }
    };

    // Store all annotator data
    images[i].annotations = fl.annotator.getExport();
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

// Returns a function which is called when the user picks an image from the
// gallery to annotate
var onPick = function(i) {
    return function() {
        save();
        restore(i);
    };
};

// Returns a function which is called when the user ticks an image from the
// gallery to be uploaded
var onSelect = function(i, el) {
    return function() {
        images[i].selected = !images[i].selected;
        el.toggleClass('active');
    };
};

// Creates a metadata object representing information about the image in the
// given file
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

// Creates a HTML <img> element that displays the image stored in the given
// file
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
    var thumbnail = $(JST.gallery_item({
        url: image.url,
        title: image.metadata.title
    }));
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
    accept: function(file) {
        addImage(file);
    }
};

$(function() {
    fl.setSwitcherIcon('upload/image');

    getFeatures();

    // Initialise the Google map
    $('#map').atlas({
        height: 400,
        width: 400,
        callback: function(text) {
            $('.location-field').val(text);
        },
        style: {
            classes: 'btn btn-default'
        }
    });

    // Pull in the list of species from the server and add it to the dropdown
    addSpecies();

    // Send the image metadata to the server when the submit button is clicked
    $('#submit').click(function() {
        // Remove all unchecked images
        var data = images.filter(function(img) {
            return img.selected;
        });

        // Require at least one image to be selected
        if (data.length === 0) {
            alert('No images selected. Please select at least one image to upload.');
            return;
        }

        sendImageData(data);
    });

    fl.active_index = 0;
});
