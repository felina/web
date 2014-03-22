FLImage = require '../../js/shared/image'

describe 'FLImage', ->
  describe 'constructor', ->
    it 'should throw an error if no file is given', ->
      fn = -> new FLImage()
      fn.should.throw(Error)

  describe 'selected', ->
    it 'should be deselected by default', ->
      image.get('selected').should.be.true
