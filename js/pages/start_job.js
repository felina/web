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

    var exes = [];

    api.getExecutables(function(data) {
        if (data.res) {
            if (data.execs.length === 0) {
                $('#exelist').text('No executables to run. Please upload one.');
            }
            else {
                _.each(data.execs, function(exec) {
                    console.log(exec);
                    var exe = new Executable({
                        name: exec.name,
                        id: exec.exeid
                    });
                    exe.render().$el.appendTo('#exelist ul');
                    exes.push(exe);
                });
            }
        }
    });

    $('#start').on('click', function() {
        console.log($('input[type=radio]:checked'));

        var exe = _.find(exes, function(e) { return e.selected; });
        if (!exe) {
            alert('Please choose an executable');
            return;
        }
        var images = ['b3639a00751454b1fa0f0cc39fb5992c', '11d70a64fee30a8dacb58f7bdfcf25f3'];

        api.startJob(exe.id, images, function(data) {
            console.log(data);
        });
    });
});
