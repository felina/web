Dropzone.autoDiscover = false;

var fl = require('./shared/common');
var FileUploader = require('./shared/views/uploaders/exe/file');
var fileUploader = new FileUploader();

$(function(){
    fl.onPageLoad('upload/executable');
    fileUploader.render('#exe');
});
