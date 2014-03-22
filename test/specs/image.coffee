FLImage = require '../../js/shared/image'

describe 'FLImage', ->
  describe 'constructor', ->
    it 'should throw an error if no file is given', ->
      fn = -> new FLImage()
      fn.should.throw(Error)

  canvas = $('<canvas>')[0]
  context = canvas.getContext('2d')
  context.fillRect(0, 0, 100, 100)
  file = new File()
  image = new FLImage(file)

  describe 'selected', ->
    it 'should be deselected by default', ->
      image.get('selected').should.be.true
