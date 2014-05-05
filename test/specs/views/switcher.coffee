Switcher = require '../../../js/views/switcher'
pages = require '../../../data/pages'

describe 'Switcher', ->
  switcher = new Switcher({
    pages: pages
  })

  it 'should be a <li> element', ->
    switcher.tagName.should.eql('li')

  it 'should have an ID', ->
    switcher.id.should.eql('switcher')

  it 'should have no icon by default', ->
    switcher.$('i').should.have.length(0)

  describe 'makeIcon', ->
    it 'should create an icon', ->
      switcher.makeIcon('home').should.be.an.instanceof(jQuery)

  describe 'setIcon', ->
    page = 'index'
    cls = pages[page].icon
    it 'should allow the icon to be set', ->
      switcher.render('body')
      switcher.setIcon(page)
      switcher.$('i').should.have.length(1)

    it 'should set the correct icon for the given page', ->
      switcher.$('i').hasClass("glyphicon-#{cls}")

    it 'should throw an error if a page not in the pages list is given', ->
      (-> switcher.setIcon('i dont exist')).should.throw(Error)
