var RemoveButton = require('./buttons/remove');

/**
Backbone View for the component used by researchers to define a field in a
custom image upload form, which is then displayed to users.
*/
module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'form-field-definer',
    initialize: function(opts) {
        opts = opts || {};
        this.parent = opts.parent;
        // Set default values for the field
        // Default to optional
        this.required = false;
        // Default to a rectangle annotation
        this.type = 'arect';
        // Default to untitled
        this.name = 'Untitled';
    },
    render: function (selector) {
        var remove = (function(el) {
            return function() {
                el.remove();
                el.parent.splice(el.parent.indexOf(el), 1);
            };
        })(this);

        // Add the Bootstrap horizontal form class for styling
        this.$el.addClass('form-horizontal');
        this.$el.attr('role', 'form');

        // Render the view's content from its JST
        this.$el.html(JST.form_field_definer());

        // Add the button for removing this field from the form
        var removeButton = new RemoveButton({
            text: 'Remove field',
            onClick: remove,
            css: {
                float: 'right'
            }
        });
        removeButton.render().$el.prependTo(this.$el);

        // Insert it into the DOM by appending it to the element with the given
        // selector
        this.$el.appendTo(selector);
        // Return the current view for method chaining
        return this;
    },
    /**
    Bind events on the view's controls to the appropriate event handlers
    */
    events: {
        'change #name': 'setName',
        'change #type': 'setType',
        'change #required': 'setRequired'
    },
    /** Stores the field name in the text field on the view */
    setName: function() {
        this.name = this.$('#name').val();
    },
    /** Stores the field type in the selector on the view */
    setType: function() {
        this.type = this.$('#type').val();
        console.log(this.type);
    },
    /**
    Stores the boolean representing whether or not this is a mandatory
    field on the view
    */
    setRequired: function() {
        this.required = this.$('#required').is(':checked');
    },
    toJSON: function() {
        return {
            name: this.name,
            required: this.required,
            type: this.type
        };
    }
});
