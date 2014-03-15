var Metadata = require('../../js/shared/metadata');

describe('Metadata', function(){
    var md = new Metadata();

    describe('isoString', function(){
        it('should return a value', function(){
            md.isoString().should.be.defined;
        });

        it('should have the correct length', function(){
            md.isoString().should.have.length(24);
        });
    });

    describe('title', function(){
        it('should have a default title', function(){
            md.get('title').should.equal('Untitled');
        });

        it('should allow the title to be updated', function() {
            md.set('title', 'Giraffe');
            md.get('title').should.equal('Giraffe');
        });
    });

    describe('datetime', function(){
        it('should have a default timestamp', function() {
            md.get('datetime').should.be.defined;
        });

        it('should be a Date object', function() {
            md.get('datetime').should.be.a('Date');
        });
    });
});
