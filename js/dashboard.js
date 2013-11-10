$(function(){
    var tmpl = JST['templates/job.html'];

    var opts = [
        {
            name: 'test',
            eta: '2h 14m',
            progress: 41
        },
        {
            name: 'test2',
            eta: '2h 15m',
            progress: 87
        }
    ];

    var jobs = $('.jobs');

    for (var i = 0; i < opts.length; i++) {
        jobs.append(tmpl(opts[i]));
    };
});
