var api = require('felina-js')();
var fl = require('./shared/common');

var MetadataView = require('./shared/metadata_view');
var Gallery = require('./shared/gallery');
var FLMap = require('./shared/map');
var Annotator = require('./shared/annotator');

var ann = new Annotator();
var gallery = new Gallery();
var map = new FLMap();
var metadata = new MetadataView();

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
        ann.setFeatures(data.anno);
        ann.render().$el.appendTo('#annotator');
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
    fl.onPageLoad('upload/image');

    makeDropzone(function(file){
        gallery.add(file, ann);
    });

    api.getFeatures(onFeatureLoad, onFeatureError);

    gallery.render('#gallery');
    map.render('#map');
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
