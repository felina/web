Banner = require '../../../js/views/banner'

describe 'Banner', ->
  banner = new Banner()
  it 'should be a <div>', ->
    banner.tagName.should.eql('div')
