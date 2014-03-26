Metadata = require '../../js/models/metadata'

describe 'Metadata', ->
  md = new Metadata()
  describe 'isoString', ->
    it 'should return a value', ->
      md.isoString().should.be.defined

    it 'should have the correct length', ->
      md.isoString().should.have.length 24

  describe 'title', ->
    it 'should have a default title', ->
      md.get('title').should.equal 'Untitled'

    it 'should allow the title to be updated', ->
      md.set 'title', 'Giraffe'
      md.get('title').should.equal 'Giraffe'

  describe 'datetime', ->
    it 'should have a default timestamp', ->
      md.get('datetime').should.be.defined

    it 'should be a Date object', ->
      md.get('datetime').should.be.a 'Date'

  describe 'location', ->
    loc = md.get('location')
    name = loc.name
    coords = loc.coords
    it 'should have a default location name', ->
      name.should.equal 'Unknown'

    it 'should have default coordinates', ->
      loc.should.be.an 'Object'
      coords.should.be.an 'Object'
      coords.should.have.property('lat').that.equals 0
      coords.should.have.property('lng').that.equals 0
