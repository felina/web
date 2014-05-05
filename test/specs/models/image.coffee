FLImage = require '../../../js/models/image'
Metadata = require '../../../js/models/metadata'

describe 'FLImage', ->
  describe 'constructor', ->
    it 'should throw an error if no file is given', ->
      fn = -> new FLImage()
      fn.should.throw(Error)

  src = '../img/elephant.jpg'

  image = new FLImage({
    src: src
  })

  describe 'selected', ->
    it 'should be deselected by default', ->
      image.get('selected').should.be.false

  describe 'metadata', ->
    it 'should have a default metadata object', ->
      image.get('metadata').should.be.an.instanceof(Metadata)

  describe 'image', ->
    it 'should have an image property', ->
      image.get('image').should.be.an('object')

  describe 'toJSON', ->
    it 'should correctly serialize to JSON', ->
      location  =
        name: 'Unknown'
        coords:
          lat: 0
          lng: 0

      actual = image.toJSON()

      actual.metadata.location.should.deep.equal(location)
      actual.metadata.title.should.eql(src)
      new Date(actual.metadata.datetime).should.be.an.instanceof(Date)
      actual.annotations.should.eql({})
