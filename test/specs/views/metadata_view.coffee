LocationPicker = require '../../../js/views/location_picker'
MetadataView = require '../../../js/views/metadata_view'
FLImage = require '../../../js/models/image'

describe 'Metadata View', ->
  it 'should not work without a location picker', ->
    (-> new MetadataView()).should.throw(Error)

  lp = new LocationPicker()
  mv = new MetadataView({picker: lp})
  img = new FLImage({ src: '../img/elephant.jpg' })
  mv.activeImage = img

  it 'should be a HTML <form>', ->
    mv.tagName.should.eql('form')

  it 'should be a horizontal form', ->
    mv.className.should.eql('form-horizontal')

  mv.render('body')

  it 'should return a default time', ->
    mv.readTime().should.eql('00:00:00')

  it 'should return a default date', ->
    mv.readDate().should.eql('2000-01-01')

  it 'should update the model when saved', ->
    mv.fields.title.val('foo')
    mv.save()
    mv.activeImage.get('metadata').get('title').should.eql('foo')
