Dropzone.autoDiscover = false;

var fl = require('../shared/common');
var FileUploader = require('../views/uploaders/exe/file');

$(function(){
    fl.onPageLoad('upload/executable');

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
