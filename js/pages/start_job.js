var onPageLoad = require('../shared/pageload');
var Executable = require('../views/executable');
var Gallery = require('../views/gallery/selectable');

$(function(){
    onPageLoad('start_job');

    // Create a new gallery to display all the images available for processing
    // and allow the researcher to select which ones to process
    var gallery = new Gallery({
        pickable: false
    });
    gallery.render('#gallery');

    // Download the list of images
    api.getProjectImages(1, function(data) {
        if (data.res) {
            // Add each one to the gallery
            _.each(data.images, function(img) {
                gallery.add({
                    src: api.url + 'images/' + img.imageid,
                    title: 'hi',
                    id: img.imageid
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
        var name = $('#name').val();

        if (name.length < 1) {
            alert('Please name the job', 'bad');
            return;
        }

        var cmd = $('#cmd').val();

        if (cmd.length < 1) {
            alert('Please provide a command to execute', 'bad');
            return;
        }

        // Get the selected executable to run
        var exe = _.find(exes, function(e) { return e.selected; });

        // Ensure that the user has selected an executable to run
        if (!exe) {
            alert('Please choose an executable', 'bad');
            return;
        }

        // Get the list of images to run it on
        var images = gallery.getSelected().map(function(img) {
            return img.get('id');
        });

        // Ensure that the user has selected some images to process
        if (images.length > 2) {
            alert('Please choose at least two images', 'bad');
            return;
        }

        var data = {
            name: name,
            command: cmd,
            executable: exe.id,
            images: images
        };

        console.log(data);

        // Make the call to start the job on the server
        api.startJob(data, function(data) {
            console.log(data);

            if (data.res) {
                window.location.reload(true);
            }
            else {
                alert('Failed to start job', 'bad');
            }
        });
    });
});
