var MetadataView = require('./shared/metadata_view');
var Gallery = require('./shared/gallery');
var FLMap = require('./shared/map');
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

// Loads the saved image data at the given index and puts it back in the DOM
// var restore = function() {
    // Update the annotator with the selected image's annotations
    // makeAnnotator(annos, image);

    // Clear old markers
    // fl.map.removeMarkers();
    // Update the map with the selected image's location if one has been set
    // if (coords && coords.lat && coords.lng) {
    //     fl.map.addMarker(coords);
    // }
// };

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

    var map = new FLMap();
    map.render('#map');

    var metadata = new MetadataView();
    metadata.render('.meta');

    // Pull in the list of species from the server and add it to the dropdown
    addSpecies();

    // Send the image metadata to the server when the submit button is clicked
    $('#submit').click(function() {
        // Remove all unchecked images
        var data = gallery.getSelected();

        // Require at least one image to be selected
        if (data.length === 0) {
            alert('No images selected. Please select at least one image to upload.');
            return;
        }

        api.uploadMetadata(data);
    });
});
