$(function(){
    var jobs = $('.jobs');

    // Get data for the jobs and add it to the DOM
    fl.get({
        url: 'jobs',
        success: function(data){
            for (var i = 0; i < data.length; i++){
                jobs.append(JST.job(data[i]));
            }
        }
    });

    fl.setSwitcherIcon('view_jobs');
});
