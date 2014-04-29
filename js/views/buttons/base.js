/**
Generic Backbone View for a button
*/
module.exports = Backbone.View.extend({
    tagName: 'button',
    className: 'btn',
    initialize: function(opts) {
        opts = opts || {};
        this.text = opts.text || '';
        this.onClick = opts.onClick || function() {};
        this.css = opts.css || {};
    },
    render: function() {
        // Create a new icon using the Bootstrap Glyphicons set, to display
        // in the button
        var icon = $('<i>').addClass('glyphicon glyphicon-' + this.icon);
        // Set any CSS classes
        this.setClasses();
        // Add the icon and the text label to the button
        this.$el.append(icon).append('&nbsp;' + this.text);

        this.$el.css(this.css);
        // Return a reference to this view for method chaining
        return this;
    },
    events: {
        'click': 'click'
    },
    /**
    Called when the user clicks on the button
    */
    click: function (e) {
        e.preventDefault();
        this.onClick();
    }
});
