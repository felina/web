$(function(){
    var tmpl = JST.job;
    var jobs = $('.jobs');
    var body = $('body');
    var toggler = $(JST.toggler());
    var dashboard = $('.dashboard');
    var sidebar = $('.sidebar');
    var sidebarList = $('.sidebar ul');

    var sidebarWidth = 250;
    var currentWidth = sidebarWidth;
    var headerHeight = 60;
    var sidebarVisible = true;

    $('#header-left').append(toggler);

    body.append(JST.settings());

    var user = {
        isResearcher: function(){ return true; }
    };

    body.on('keypress', function(evt){
        if(evt.keyCode === 116){
            toggleSidebar();
        }
    });

    toggler.click(function(){
        toggleSidebar();
    });

    var toggleSidebar = function(){
        currentWidth = sidebarVisible ? 0 : sidebarWidth;
        setSidebar();
        sidebarVisible = !sidebarVisible;
    };

    var setSidebar = function(){
        var height = body.height() - (headerHeight * 2);
        dashboard.css({
            left: currentWidth,
            width: body.width() - currentWidth,
            height: height
        });
        sidebar.css({
            height: height
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

    if(user.isResearcher()){
        sidebarList.append(JST['sidebars/researcher']());
    }

    sidebarList.append(JST['sidebars/citizen']());

    setSidebar();

    $(window).resize(_.throttle(setSidebar, 500));

    barChart('#graph', 'data/data.tsv')
});
