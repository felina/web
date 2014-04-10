var onPageLoad = require('../shared/pageload');
var FormDefiner = require('../views/form_definer');
var AddButton = require('../views/buttons/add');

var fields = [];

var addField = function () {
    var field = new FormDefiner();
    field.render('.fields');
    fields.push(field);
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
        var features = {};

        _.each(fields, function(field) {
            features[field.name] = {
                required: field.required,
                type: field.type
            };
        });

        var project = {
            name: $('#name').val(),
            desc: $('#desc').val(),
            features: features
        };

        console.log(project);

        if(!project.name) {
            alert('Please name this project');
        }

        if(!project.desc) {
            alert('Please give this project a description');
        }

        api.addProject(project, function (data) {
            console.log(data);
        });
    });
});
