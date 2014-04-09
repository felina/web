var onPageLoad = require('../shared/pageload');
var FLImage = require('../models/image');
var Thumbnail = require('../views/thumbnail');
var Executable = require('../views/executable');

$(function(){
    onPageLoad('start_job');

    var gallery = $('#gallery');

    api.getImages(function(data) {
        if (data.res) {
            _.each(data.images, function(img) {
                var image = new FLImage({
                    src: api.url + 'img?id=' + img.imageid
                });
                var thumb = new Thumbnail({
                    model: image
                });
                thumb.render().$el.appendTo(gallery);
            });
        }
    });

    api.getExecutables(function(data) {
        if (data.res) {
            if (data.execs.length === 0) {
                $('#exelist').text('No executables to run. Please upload one.');
            }
            else {
                _.each(data.execs, function(exec) {
                    console.log(exec);
                    var exe = new Executable({
                        name: exec.name
                    });
                    exe.render().$el.appendTo('#exelist ul');
                });
            }
        }
    });
});
