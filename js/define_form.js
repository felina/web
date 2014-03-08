var add_field = function(){
    var field = $(JST.form_field_definer());
    field.find('#closer').click(function(){
        field.remove();
    });
    $('.fields').append(field);
};

$(function(){
    add_field();

    $('#new_field').click(function(){
        add_field();
    });

    fl.setSwitcherIcon('define_form');
});
