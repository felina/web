ProjectPicker = require '../../../js/views/project_picker'

describe 'Project picker', ->
  onLoad = ->
  onError = ->

  pp = new ProjectPicker({
    onFeatureLoad: onLoad
    onFeatureError: onError
  })

  it 'should be a <select> element', ->
    pp.tagName.should.eql('select')

  it 'should have the right class', ->
    pp.className.should.eql('form-control')

  it 'should have the right id', ->
    pp.id.should.eql('species-list')

  # it 'should have no selected project before the list is downloaded', ->
  #   should.not.exist(pp.selectedID)

  pp.render()

  it 'should get the project list when rendered', ->
    setTimeout (-> pp.$el.children().should.have.length.above(0)), 100

  it 'should have a selected project when rendered', ->
    setTimeout (-> pp.selectedID.should.be.a('number')), 100
