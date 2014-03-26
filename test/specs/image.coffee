FLImage = require '../../js/models/image'

describe 'FLImage', ->
  describe 'constructor', ->
    it 'should throw an error if no file is given', ->
      fn = -> new FLImage()
      fn.should.throw(Error)

  image = new FLImage({
    src: '../img/elephant.jpg'
  })

  describe 'selected', ->
    it 'should be deselected by default', ->
      image.get('selected').should.be.false
