Dropzone.autoDiscover = false;

var onPageLoad = require('../shared/pageload');
var MetadataView = require('../views/metadata_view');
var Gallery = require('../views/gallery/selectable');
var LocationPicker = require('../views/location_picker');
var Annotator = require('../views/annotator');
var URLUploader = require('../views/uploaders/img/url');
var FileUploader = require('../views/uploaders/img/file');
var ProjectPicker = require('../views/project_picker');

var ann = new Annotator();
var lp = new LocationPicker();
var metadata = new MetadataView({ picker: lp });
var gallery = new Gallery({
    annotator: ann,
    metadataView: metadata
});
var urlUploader = new URLUploader({
    gallery: gallery
});

var onFeatureLoad = function(data) {
    if (data.res) {
        console.log('loaded features');
        ann.setFeatures(data.anno);
        ann.render().$el.appendTo('#annotator');
    }
    else {
        console.log('failed to load features');
        console.log(data);
    }
};

var onFeatureError = function() {
    console.log('Failed to load features');
};

var pp = new ProjectPicker({
    onFeatureLoad: onFeatureLoad,
    onFeatureError: onFeatureError
});

$(function() {
    onPageLoad('upload/image');

    var fileUploader = new FileUploader({
        gallery: gallery
    });
    fileUploader.render('#upload');

    gallery.render('#gallery');
    lp.render('#map');
    metadata.render('.meta');
    urlUploader.render('#upload');
    pp.render().$el.appendTo('#picker-wrap');

    // Send the image metadata to the server when the submit button is clicked
    $('#submit').click(function() {
        // Remove all unchecked images
        var data = gallery.getSelected().map(function(image) {
            return image.toJSON();
        });

        var dataMap = {};

        data.forEach(function(item) {
            var key = item.metadata.id;
            delete item.metadata.id;
            dataMap[key] = item;
        });

        // Require at least one image to be selected
        if (data.length === 0) {
            alert('No images selected. Please select at least one image to upload.', 'bad');
            return;
        }

        console.log(dataMap);

        api.uploadMetadata(dataMap);
    });
});
