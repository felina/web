$(function(){
    var tmpl = JST.job;
    var jobs = $('.jobs');
    var body = $('body');
    var toggler = $("<button id='toggleSidebar'><i class='glyphicon glyphicon-align-justify'></i></button>");
    var dashboard = $('.dashboard');
    var sidebar = $('.sidebar');
    var sidebarList = $('.sidebar ul');

    var sidebarWidth = 250;
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

    if(user.isResearcher()){
        sidebarList.append(JST['sidebars/researcher']());
    }

    sidebarList.append(JST['sidebars/citizen']());

    setSidebar(sidebarWidth);
    dashboard.css({height: body.height() - 120});
    sidebar.css({height: body.height() - 120});

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 700 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient('bottom');

    var yAxis = d3.svg.axis().scale(y).orient('left').ticks(10, '%');

    var svg = d3.select('#graph').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.tsv('data.tsv', type, function(error, data) {
      x.domain(data.map(function(d) { return d.letter; }));
      y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

      svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Frequency');

      svg.selectAll('.bar')
          .data(data)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return x(d.letter); })
          .attr('width', x.rangeBand())
          .attr('y', function(d) { return y(d.frequency); })
          .attr('height', function(d) { return height - y(d.frequency); });
    });

    function type(d) {
      d.frequency = +d.frequency;
      return d;
    }
});
