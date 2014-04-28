LocationPicker = require '../../../js/views/location_picker'

describe 'Location Picker', ->
  lp = new LocationPicker()

  it 'should be a div', ->
    lp.tagName.should.eql('div')

  it 'should have a class', ->
    lp.className.should.eql('location-picker')

  it 'should not have a map before rendering', ->
    should.not.exist(lp.map)

  lp.render('body')

  it 'should have a map after rendering', ->
    lp.atlas.should.be.an.instanceof(GMaps)

  it 'should return null coordinates before a location is chosen', ->
    should.equal(lp.readCoords(), null)
