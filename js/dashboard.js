$(function(){
    var jobs = $('.jobs');

    // Get data for the jobs and add it to the DOM
    $.getJSON('data/jobs.json', function(data){
        for (var i = 0; i < data.length; i++){
            jobs.append(JST.job(data[i]));
        };
    });

    // Load some dummy data and display it as a bar chart
    barChart('#graph', 'data/data.tsv');

    fl.setSwitcherIcon('view-jobs');
});
