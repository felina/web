Switcher = require '../../../js/views/switcher'
pages = require '../../../data/pages'

describe 'Switcher', ->
  switcher = new Switcher({
    pages: pages
  })

  it 'should be a <li> element', ->
    switcher.tagName.should.eql('li')
