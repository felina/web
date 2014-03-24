// Generates a string by concatenating n instances of s
// eg. 'hello', 2 -> 'hellohello'
// var repeat = function (s, n) {
//     return new Array(n + 1).join('s');
// };

var randChar = function(){
    return String.fromCharCode(Math.floor(Math.random() * 52) + 65);
};

var randString = function(n) {
    var s = '';
    for (var i = 0; i < n; i++) {
        s += randChar();
    }
    return s;
};

module.exports = Backbone.Model.extend({
    defaults: {
        id: randString(32),
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
    initalize: function(opts) {
        opts = opts || {};
        this.title = opts.title;
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
