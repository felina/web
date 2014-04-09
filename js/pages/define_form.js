var onPageLoad = require('../shared/pageload');
var FormDefiner = require('../views/form_definer');
var AddButton = require('../views/buttons/add');

var addField = function () {
    var field = new FormDefiner();
    field.render('.fields');
};

var addButton = new AddButton({
    text: 'New field',
    onClick: addField
});

$(function(){
    onPageLoad('define_form');

    addField();

    addButton.render().$el.appendTo('#addwrap');

    $('#submit').on('click', function() {
        var project = {
            name: $('#name').val(),
            desc: $('#desc').val(),
            features: {}
        };
        api.addProject(project, function (data) {
            console.log(data);
        });
    });
});
