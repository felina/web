$(function(){
    var tmpl = JST.job;
    var jobs = $('.jobs');

    var opts = [
        {
            name: 'test',
            eta: '2h 14m',
            current: 10,
            total: 37
        },
        {
            name: 'test2',
            eta: '2h 15m',
            current: 10,
            total: 37
        }
    ];

    for (var i = 0; i < opts.length; i++) {
        jobs.append(tmpl(opts[i]));
    };
});
