$(function(){
    var tmpl = JST.job;
    var jobs = $('.jobs');

    var sidebarWidth = 250;
    var sidebarVisible = true;

    var user = {
        isResearcher: function(){ return true; }
    };

    $('body').on('keypress', function(evt){
        if(evt.keyCode === 116){
            toggleSidebar();
        }
    });

    var toggleSidebar = function(){
        $('.dashboard').css('left', sidebarVisible ? 0 : 250);
        sidebarVisible = !sidebarVisible
    };

    var opts = [
        {
            name: 'Process some penguins',
            eta: '37m',
            current: 10,
            total: 37
        },
        {
            name: 'Analyse some elephants',
            eta: '2h 15m',
            current: 82,
            total: 96
        }
    ];

    for (var i = 0; i < opts.length; i++) {
        jobs.append(tmpl(opts[i]));
    };

    var sidebar = $('.sidebar ul');

    if(user.isResearcher()){
        sidebar.append(JST['sidebars/researcher']());
    }

    sidebar.append(JST['sidebars/citizen']());
});
