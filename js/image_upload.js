var API = require('felina-js');
var api = new API('http://nl.ks07.co.uk:5000/');
var fl = require('./shared/common');

var MetadataView = require('./shared/metadata_view');
var Gallery = require('./shared/gallery');
var FLMap = require('./shared/map');
var Annotator = require('./shared/annotator');
var URLUploader = require('./shared/views/uploaders/url');
var FileUploader = require('./shared/views/uploaders/file');

var ann = new Annotator();
var map = new FLMap();
var metadata = new MetadataView({
    map: map
});
var gallery = new Gallery({
    annotator: ann,
    metadataView: metadata
});
var urlUploader = new URLUploader({
    gallery: gallery
});

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

$(function() {
    fl.onPageLoad('upload/image');

    var fileUploader = new FileUploader({
        callback: function(file, done){
            gallery.add({file: file});
            done();
        }
    });
    fileUploader.render('#upload');

    api.getFeatures(onFeatureLoad, onFeatureError);

    gallery.render('#gallery');
    map.render('#map');
    metadata.render('.meta');
    urlUploader.render('#upload');

    // Pull in the list of species from the server and add it to the dropdown
    addSpecies();

    // Send the image metadata to the server when the submit button is clicked
    $('#submit').click(function() {
        // Remove all unchecked images
        var data = gallery.getSelected().map(function(image) {
            return image.get('metadata').toJSON();
        });

        var dataMap = {};

        data.forEach(function(item) {
            var key = item.id;
            delete item.id;
            dataMap[key] = item;
        });

        // Require at least one image to be selected
        if (data.length === 0) {
            alert('No images selected. Please select at least one image to upload.');
            return;
        }

        console.log(dataMap);

        api.uploadMetadata(dataMap);
    });
});
