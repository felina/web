var fl = require('./shared/common');
var barChart = require('./shared/bar_chart');

$(function(){
    fl.onPageLoad('graphs');
    // Load some dummy data and display it as a bar chart
    barChart('#graph', 'data/data.tsv');
});
