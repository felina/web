/**
Backbone View for the image metadata editing form
*/
module.exports = Backbone.View.extend({
    tagName: 'form',
    className: 'form-horizontal',
    /** Renders the view's HTML content */
    render: function (selector) {
        // Add the main DOM structure from the view's JST
        this.$el.html(JST.metadata({}));
        // Save references to the text fields to later access their location
        this.fields = {
            title: this.$('.title-field'),
            time: this.$('.time-field'),
            date: this.$('.date-field'),
            location: this.$('.location-field')
        };
        // Add the view to the DOM by appending it to the element associated
        // with the given selector
        this.$el.appendTo(selector);
        // Return a reference to this view for method chaining
        return this;
    },
    initialize: function(opts) {
        opts = opts || {};
        if (!opts.picker) {
            throw new Error('Please provide a location picker to accompany this metadata view');
        }
        // Store a reference to the map view that accompanies this metadata
        // view, to allow the map's coordinates to be updated in the textual
        // geocoded location name
        this.picker = opts.picker;
    },
    /**
    Synchronises the view with the current model by updating the text fields
    to display previously stored values
    */
    update: function(model) {
        this.fields.title.val(model.get('title'));
        this.fields.time.val(model.time());
        this.fields.date.val(model.date());
        this.fields.location.val(model.get('location').name);
    },
    /**
    Returns a string representing the time the image was captured, as supplied
    by the user. Defaults to midnight.
    */
    readTime: function() {
        return this.fields.time.val() || '00:00:00';
    },
    /**
    Returns a string representing the date the image was captured, as supplied
    by the user. Defaults to January 1st, 2000.
    */
    readDate: function() {
        return this.fields.date.val() || '2000-01-01';
    },
    /**
    Returns a Date object representing the date and time that the image was
    captured
    */
    dateTime: function() {
        return new Date(this.readDate() + 'T' + this.readTime());
    },
    /**
    Stores all currently entered metadata in this view's model to be later
    restored for further editing, or to be submitted to the server
    */
    save: function() {
        if(!this.activeImage) {
            return;
        }

        this.activeImage.get('metadata').set({
            title: this.fields.title.val(),
            datetime: this.dateTime(),
            location: {
                name: this.fields.location.val(),
                coords: this.picker.readCoords()
            }
        });
    }
});
