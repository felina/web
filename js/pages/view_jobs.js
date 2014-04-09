var onPageLoad = require('../shared/pageload');

$(function(){
    onPageLoad('view_jobs');

    var jobs = $('.jobs');

    // Get data for the jobs and add it to the DOM
    api.getJobs(function(data) {
        if (data.res) {
            _.each(data.jobs, function(job){
                jobs.append(JST.job(job));
            });
        }
    });
});
