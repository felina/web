var onPageLoad = require('../shared/pageload');
var barChart = require('../shared/bar_chart');

$(function(){
    onPageLoad('graphs');
    // Load some dummy data and display it as a bar chart
    barChart('#graph', 'data/data.tsv');
});
