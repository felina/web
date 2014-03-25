var fl = require('../shared/common');
var FormDefiner = require('../views/form_definer');

var addField = function () {
    var field = new FormDefiner();
    field.render('.fields');
};

$(function(){
    fl.onPageLoad('define_form');

    addField();

    $('#new_field').click(function(){
        addField();
    });
});
