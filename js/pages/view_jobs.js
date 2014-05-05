var onPageLoad = require('../shared/pageload');
var Job = require('../models/job');
var JobView = require('../views/jobview');

var addJob = function(el, opts) {
    var job = new Job(opts);
    var jobview = new JobView({
        model: job
    });

    jobview.render().$el.appendTo(el);
};

$(function(){
    onPageLoad('view_jobs');

    var lists = {
        queued: $('#queued'),
        active: $('#active'),
        completed: $('#completed')
    };

    // Get all jobs started by the current user
    api.getJobs(function(data) {
        console.log(data);

        // Show an error if the jobs failed to load
        if (!data.res) {
            alert('Failed to load jobs', 'bad');
            return;
        }

        var jobs = data.jobs;

        // Split the jobs in to three categories, queued, active and completed
        var types = {
            queued: _.filter(jobs, function(job) { return !job.started; }),
            active: _.filter(jobs, function(job) { return job.started && !job.completed; }),
            completed: _.filter(jobs, function(job) { return job.completed; })
        };

        // Handle each category in turn
        _.each(['queued', 'active', 'completed'], function(type) {
            var t = types[type];
            var el = lists[type];

            // If the current category has no jobs, display a message in this list
            if(t.length === 0) {
                el.text('No ' + type + ' jobs.');
                return;
            }

            // Otherwise, add all the jobs in this category to the category's list
            _.each(t, function(job){
                // For completed jobs, get the URL of the CSV file containg the results of the job
                if (type === 'completed') {
                    api.getCSV(job.jobid, function(data) {
                        if (data.res) {
                            job.csvurl = data.url;
                            addJob(el ,job);
                        }
                        else {
                            alert('Failed to load job results for job ' + job.name, 'bad');
                        }
                    });
                }
                // For other types of job, just add it straight to the DOM
                else {
                    addJob(el, job);
                }
            });
        });
    });
});
