ImageSet = require '../../../js/collections/image_set'
FLImage = require '../../../js/models/image'

describe 'ImageSet', ->
  imgset = new ImageSet()

  describe 'model', ->
    it 'should be FLImage', ->
      imgset.model.should.eql(FLImage)

  describe 'onAdd', ->
    it 'should be a function', ->
      imgset.onAdd.should.be.a('function')
