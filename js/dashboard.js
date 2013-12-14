$(function(){
    var tmpl = JST.job;
    var jobs = $('.jobs');
    var body = $('body');
    var toggler = $('<button id="toggleSidebar"><i class="glyphicon glyphicon-align-justify"></i></button>');
    var dashboard = $('.dashboard');

    var sidebarWidth = 250;
    var sidebarVisible = true;

    $('#header-left').append(toggler);

    body.append(JST.settings());

    var user = {
        isResearcher: function(){ return true; }
    };

    $('body').on('keypress', function(evt){
        if(evt.keyCode === 116){
            toggleSidebar();
        }
    });

    toggler.click(function(){
        toggleSidebar();
    });

    var toggleSidebar = function(){
        var width = sidebarVisible ? 0 : sidebarWidth;
        setSidebar(width);
        sidebarVisible = !sidebarVisible;
    };

    var setSidebar = function(width){
        dashboard.css({
            left: width,
            width: body.width() - width
        });
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

    setSidebar(sidebarWidth);
});
