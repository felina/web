var Metadata = require('../../js/shared/metadata');

describe('Metadata', function(){
    var md = new Metadata();

    describe('isoString', function() {
        it('should return a value', function() {
            md.isoString().should.be.defined;
        });

        it('should have the correct length', function() {
            md.isoString().should.have.length(24);
        });
    });

    describe('title', function() {
        it('should have a default title', function() {
            md.get('title').should.equal('Untitled');
        });

        it('should allow the title to be updated', function() {
            md.set('title', 'Giraffe');
            md.get('title').should.equal('Giraffe');
        });
    });

    describe('datetime', function() {
        it('should have a default timestamp', function() {
            md.get('datetime').should.be.defined;
        });

        it('should be a Date object', function() {
            md.get('datetime').should.be.a('Date');
        });
    });

    describe('location', function() {
        var loc = md.get('location');
        var name = loc.name;
        var coords = loc.coords;

        it('should have a default location name', function() {
            name.should.equal('Unknown');
        });

        it('should have default coordinates', function() {
            loc.should.be.an('Object');
            coords.should.be.an('Object');
            coords.should.have.property('lat').that.equals(0);
            coords.should.have.property('lng').that.equals(0);
        });
    });
});
