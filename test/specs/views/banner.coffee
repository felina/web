Banner = require '../../../js/views/banner'

describe 'Banner', ->
  banner = new Banner()

  it 'should be a <div>', ->
    banner.tagName.should.eql('div')

  it 'should have the id #banner', ->
    banner.id.should.eql('banner')

  it 'should have a render method', ->
    banner.should.respondTo('render')

  banner.render()

  it 'should have a background image after rendering', ->
    banner.$el.css('background-image').should.have.string('jpg')

  it 'should allow the form to be hidden', ->
    banner.hideForm()
    banner.$('form').is(':visible').should.be.false

  it 'should have a submit method', ->
    banner.should.respondTo('submit')
