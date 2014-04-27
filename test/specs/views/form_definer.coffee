FormDefiner = require '../../../js/views/form_definer'

describe 'Form definer', ->
  definer = new FormDefiner()

  it 'should be a HTML <form>', ->
    definer.tagName.should.eql('form')

  it 'should have the right class', ->
    definer.className.should.eql('form-field-definer')

  it 'should not be required by default', ->
    definer.required.should.be.false

  it 'should be a rectangle by default', ->
    definer.type.should.eql('Rectangle')

  it 'should be untitled by default', ->
    definer.name.should.eql('Untitled')
