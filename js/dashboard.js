$(function(){
    var jobs = $('.jobs');
    var body = $('body');
    var dashboard = $('.dashboard');
    var sidebar = $('.sidebar');
    var sidebarList = sidebar.find('ul')
    var toggler = $('#toggleSidebar');

    var sidebarWidth = 250;
    var closedWidth = headerHeight = 45;
    var currentWidth = sidebarWidth;
    var sidebarVisible = true;
    var resizeDelay = 500;

    // Add settings modal
    body.append(JST.settings());

    dashboard.append(JST.footer());

    // TODO: swap this out for a real instance of the User class
    var user = {
        isResearcher: function(){ return true; }
    };

    // Shows and hides the sidebar
    var toggleSidebar = function(){
        currentWidth = sidebarVisible ? closedWidth : sidebarWidth;
        setSidebar();
        titles.fadeToggle(400);
        toggler.toggleClass('spun');
        sidebarVisible = !sidebarVisible;
    };

    // Updates the dimensions and positions of the sidebar and dashboard to
    // reflect the current state
    var setSidebar = function(){
        var height = body.height() - headerHeight;
        dashboard.css({
            left: currentWidth,
            width: body.width() - currentWidth,
            height: height
        });
        sidebar.css({
            height: height
        });
    };

    // Bind events
    // Keyboard shortcuts
    body.on('keypress', function(evt){
        // 't' toggles the sidebar
        if(evt.keyCode === 116){
            toggleSidebar();
        }
    });

    // Clicking the toggle button also toggles the sidebar
    toggler.click(function(){
        toggleSidebar();
    });

    // Resizing the browser updates dashboard dimensions
    $(window).resize(_.throttle(setSidebar, resizeDelay));

    // Get data for the jobs and add it to the DOM
    $.getJSON('data/jobs.json', function(data){
        for (var i = 0; i < data.length; i++){
            jobs.append(JST.job(data[i]));
        };
    });

    // Add menu items to the sidebar
    if(user.isResearcher()){
        sidebarList.append(JST['sidebars/researcher']());
    }
    sidebarList.append(JST['sidebars/citizen']());

    var titles = sidebar.find('.title');

    // Set initial sidebar dimensions
    setSidebar();

    // Load some dummy data and display it as a bar chart
    barChart('#graph', 'data/data.tsv')
});
