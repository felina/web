var Metadata = require('./shared/metadata.js');
var MetadataView = require('./shared/metadata_view.js');
var Thumbnail = require('./shared/thumbnail.js');
var Gallery = require('./shared/gallery.js');
var FLImage = require('./shared/image.js');
var api = require('felina-js')();

/**
 * Creates or updates the annotator element with the given image and its
 * annotations
 * @param {Object} annos - The annotation data to be loaded into the
 * annotator - used for restoring the progress on previously annotated images
 * @param {jQuery object} image - A jQuery-wrapped HTML <img> tag with the
 * image to be displayed
 */
var makeAnnotator = function(annos, image) {
    var args = {
        width: 500,
        height: 500,
        features: fl.features,
        style: {
            classes: 'btn btn-default'
        }
    };

    if (annos) {
        args.annotations = annos;
    }

    if (image) {
        args.img = image;
    }

    fl.annotator = $('#annotator').annotator(args);
};

var addSpecies = function(){
    var list = $('#species-list');

    api.getSpecies(function(data) {
        if (data.res) {
            for (var i = 0; i < data.projects.length; i++) {
                var specie = data.projects[i];
                $('<option>')
                    .attr('value', specie)
                    .text(specie)
                    .appendTo(list);
            }
        }
    });
};

var onFeatureLoad = function(data) {
    if (data.res) {
        fl.features = data.anno;
        makeAnnotator();
    }
};

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
    // Update the annotator with the selected image's annotations
    makeAnnotator(annos, image);

    // Clear old markers
    fl.map.removeMarkers();
    // Update the map with the selected image's location if one has been set
    if (coords && coords.lat && coords.lng) {
        fl.map.addMarker(coords);
    }
};

var addImage = function(file) {
    images.add(file);
};

var makeDropzone = function(callback) {
    Dropzone.options.dropimg = {
        url: fl.server + 'upload/img',
        acceptedFiles: 'image/*',
        maxFilesize: 4096,
        accept: callback
    };
};

$(function() {
    var gallery = new Gallery();
    gallery.render('#gallery');

    makeDropzone(function(file){
        gallery.add(file);
    });

    fl.setSwitcherIcon('upload/image');

    api.getFeatures(onFeatureLoad);

    // Initialise the Google map
    fl.map = $('#map').atlas({
        height: 300,
        width: 500,
        callback: function(text) {
            $('.location-field').val(text);
        },
        style: {
            classes: 'btn btn-default'
        }
    });

    var metadata = new MetadataView();
    metadata.render('.meta');

    // Pull in the list of species from the server and add it to the dropdown
    addSpecies();

    // Send the image metadata to the server when the submit button is clicked
    $('#submit').click(function() {
        // Remove all unchecked images
        var data = images.filter(function(image) {
            return image.selected;
        });

        // Require at least one image to be selected
        if (data.length === 0) {
            alert('No images selected. Please select at least one image to upload.');
            return;
        }

        api.uploadMetadata(data);
    });

    fl.active_index = 0;
});
