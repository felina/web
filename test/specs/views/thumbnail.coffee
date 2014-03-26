Thumbnail = require '../../../js/views/thumbnail'
Annotator = require '../../../js/views/annotator'
MetadataView = require '../../../js/views/metadata_view'
FLImage = require '../../../js/models/image'

describe 'Thumbnail', ->
  annotator = new Annotator()

  mv = new MetadataView()

  thumbnail = new Thumbnail({
    annotator: annotator
    metadataView: mv
    model: new FLImage({src: 'foo.jpg'})
  })

  it 'should be a div', ->
    thumbnail.tagName.should.eql('div')

  it 'should have a class', ->
    thumbnail.className.should.eql('gallery-item')

  it 'should have an annotator to send its image to when clicked', ->
    thumbnail.annotator.should.be.an.instanceof(Annotator)

  it 'should have a metadata view to save its metadata to for editing', ->
    thumbnail.metadataView.should.be.an.instanceof(MetadataView)

  it 'should have an be FLImage', ->
    thumbnail.model.should.be.an.instanceof(FLImage)

  describe 'Events', ->
    it 'should respond to clicks on the checkbox', ->
      thumbnail.events.should.have.property('change input')

    it 'should respond to clicks on the picker', ->
      thumbnail.events.should.have.property('click .picker')
