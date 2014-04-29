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
    onPageLoad('create_project');

    addField();

    addButton.render().$el.appendTo('#addwrap');

    $('#submit').on('click', function() {
        var project = {
            name: $('#name').val(),
            desc: $('#desc').val(),
        };

        console.log(project);

        if(!project.name) {
            alert('Please name this project', 'bad');
        }

        if(!project.desc) {
            alert('Please give this project a description', 'bad');
        }

        if(fields.length < 1) {
            alert('Please specify at least one feature to be annotated', 'bad');
        }

        api.addProject(project, function (data) {
            console.log(data);
            if (data.res) {
                var out = {
                    anno: fields.map(function(field) {
                        return field.toJSON();
                    })
                };

                var id = data.project.id;

                api.putFeatures(id, out, function(data) {
                    if (data.res) {
                        alert('Project created', 'good');
                    }
                    else {
                        alert(data.err.msg, 'bad');
                    }
                });
            }
            else {
                alert(data.err.msg, 'bad');
            }
        });
    });
});
