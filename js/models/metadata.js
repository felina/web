module.exports = Backbone.Model.extend({
    defaults: {
        title: 'Untitled',
        datetime: new Date(),
        location: {
            name: 'Unknown',
            coords: {
                lat: 0,
                lng: 0
            }
        }
    },
    // Get the ISO standard date representation in the format
    // "YYYY-MM-DDTHH:mm:SS.nnnZ"
    isoString: function() {
        return this.get('datetime').toISOString();
    },
    // Split into the date and time components
    dateParts: function() {
        return this.isoString().split('T');
    },
    date: function() {
        return this.dateParts()[0];
    },
    // Remove milliseconds from time
    time: function() {
        return this.dateParts()[1].split('.')[0];
    }
});
