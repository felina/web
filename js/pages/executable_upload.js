Dropzone.autoDiscover = false;

var onPageLoad = require('../shared/pageload');
var FileUploader = require('../views/uploaders/exe/file');

$(function(){
    onPageLoad('upload/executable');

    var getName = (function(field) {
        return function() {
            return field.val();
        };
    })($('#name'));

    var fileUploader = new FileUploader({
        getName: getName
    });

    fileUploader.render('#upload');
});
