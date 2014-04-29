var onPageLoad = require('../shared/pageload');
var Executable = require('../views/executable');
var Gallery = require('../views/gallery/default');

$(function(){
    onPageLoad('start_job');

    // Create a new gallery to display all the images available for processing
    // and allow the researcher to select which ones to process
    var gallery = new Gallery();
    gallery.render('#gallery');

    // Download the list of images
    api.getProjectImages(1, function(data) {
        if (data.res) {
            // Add each one to the gallery
            _.each(data.images, function(img) {
                gallery.add({
                    url: api.url + 'images/' + img.imageid,
                    title: 'hi'
                });
            });
        }
    });

    // Stores the views for each uploaded executable
    var exes = [];

    // Download the list of executables uploaded by the current user
    api.getExecutables(function(data) {
        if (data.res) {
            // Show a message if they haven't uploaded any yet
            if (data.execs.length === 0) {
                $('#exelist').text('No executables to run. Please upload one.');
            }
            else {
                // Create a new view to display each executable they've
                // uploaded, and add it to the list for them to pick one
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

    // When the user clicks on the start button
    $('#start').on('click', function() {
        // Get the selected executable to run
        var exe = _.find(exes, function(e) { return e.selected; });

        // Ensure that the user has selected an executable to run
        if (!exe) {
            alert('Please choose an executable', 'bad');
            return;
        }

        // Get the list of images to run it on
        var images = gallery.getSelected().map(function(img) {
            return img.get('metadata').get('id');
        });

        // Ensure that the user has selected some images to process
        if (images.length === 0) {
            alert('Please choose at least one image', 'bad');
            return;
        }

        // Make the call to start the job on the server
        api.startJob(exe.id, images, function(data) {
            console.log(data);
        });
    });
});
