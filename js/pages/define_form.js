var onPageLoad = require('../shared/pageload');
var FormDefiner = require('../views/form_definer');

var addField = function () {
    var field = new FormDefiner();
    field.render('.fields');
};

$(function(){
    onPageLoad('define_form');

    addField();

    $('#new_field').click(function(){
        addField();
    });
});
