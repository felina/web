var onPageLoad = require('../shared/pageload');
var FormDefiner = require('../views/form_definer');
var AddButton = require('../views/buttons/add');

var fields = [];

var addField = function () {
    var field = new FormDefiner({
        parent: fields
    });
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

        console.log(_.size(project.features));

        if(_.size(project.features) < 1) {
            alert('Please specify at least one feature to be annotated');
        }

        api.addProject(project, function (data) {
            console.log(data);
            if (data.res) {
                alert('Project created');
            }
            else {
                alert(data.err.msg);
            }
        });
    });
});
