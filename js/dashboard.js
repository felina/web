$(function(){
    var jobs = $('.jobs');

    // Get data for the jobs and add it to the DOM
    $.getJSON('data/jobs.json', function(data){
        for (var i = 0; i < data.length; i++){
            jobs.append(JST.job(data[i]));
        }
    });

    fl.setSwitcherIcon('view-jobs');
});
