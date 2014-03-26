var onPageLoad = require('../shared/pageload');

$(function(){
    onPageLoad('view_jobs');

    var jobs = $('.jobs');

    // Get data for the jobs and add it to the DOM
    api.getJobs(function(data) {
        _.each(data, function(item){
            jobs.append(JST.job(item));
        });
    });
});
