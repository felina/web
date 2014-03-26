FLMap = require '../../../js/views/map'

describe 'Map', ->
  map = new FLMap()

  it 'should be a div', ->
    map.tagName.should.eql('div')

  it 'should have a class', ->
    map.className.should.eql('map')

  it 'should not have a map before rendering', ->
    should.not.exist(map.map)

  # map.render('body')

  # it 'should have a map after rendering', ->
  #   map.map.should.be.an.instanceof(GMaps)
