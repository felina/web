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

  definer.render('body')

  it 'should have a class of form-horizontal after rendering', ->
    definer.$el.hasClass('form-horizontal').should.be.true

  it 'should have a role of form after rendering', ->
    definer.$el.attr('role').should.eql('form')

  # it 'should respond to changes in the name field', ->
  #   definer.$('#name').val('foo')
  #   definer.name.should.eql('foo')

  # it 'should respond to changes in the required field', ->
  #   definer.$('#required').prop('checked', true)
  #   definer.required.should.be.true

  # it 'should respond to changes in the type field', ->

