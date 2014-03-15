var MetadataView = require('./shared/metadata_view');
var Gallery = require('./shared/gallery');
var FLMap = require('./shared/map');
var api = require('felina-js')();
var fl = require('./shared/common');

/**
 * Creates or updates the annotator element with the given image and its
 * annotations
 * @param {Object} annos - The annotation data to be loaded into the
 * annotator - used for restoring the progress on previously annotated images
 * @param {jQuery object} image - A jQuery-wrapped HTML <img> tag with the
 * image to be displayed
 */
var makeAnnotator = function(features, annos, image) {
    var args = {
        width: 500,
        height: 500,
        features: features,
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

    return $('#annotator').annotator(args);
};

var addSpecies = function(){
    var list = $('#species-list');

    api.getSpecies(function(data) {
        if (!data.res) {
            alert('Failed to load project list');
            return;
        }
        _.each(data.projects, function(project){
            $('<option>').attr('value', project).text(project).appendTo(list);
        });
    });
};

var onFeatureLoad = function(data) {
    if (data.res) {
        console.log('loaded features');
        makeAnnotator(data.anno);
    }
    else {
        console.log('failed to load features');
    }
};

var onFeatureError = function() {
    console.log('failed to load features');
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
    fl.onPageLoad();

    var gallery = new Gallery();
    gallery.render('#gallery');

    makeDropzone(function(file){
        gallery.add(file);
    });

    fl.setSwitcherIcon('upload/image');

    api.getFeatures(onFeatureLoad, onFeatureError);

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
