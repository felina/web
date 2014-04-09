var onPageLoad = require('../shared/pageload');
var Executable = require('../views/executable');
var Gallery = require('../views/gallery');

$(function(){
    onPageLoad('start_job');

    var gallery = new Gallery({});
    gallery.render('#gallery');

    api.getImages(function(data) {
        if (data.res) {
            _.each(data.images, function(img) {
                gallery.add({
                    src: api.url + 'img?id=' + img.imageid
                });
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
        var exe = _.find(exes, function(e) { return e.selected; });
        if (!exe) {
            alert('Please choose an executable');
            return;
        }

        var images = gallery.getSelected().map(function(img) {
            return img.get('metadata').get('id');
        });
        if (images.length === 0) {
            alert('Please choose at least one image');
            return;
        }

        api.startJob(exe.id, images, function(data) {
            console.log(data);
        });
    });
});
