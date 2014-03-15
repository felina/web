var Metadata = require('../../js/shared/metadata');

describe('Metadata', function(){
    var md = new Metadata();

    describe('isoString', function(){
        it('should return a value', function(){
            md.isoString().should.be.defined;
        });
    });
});
