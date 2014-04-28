LoginForm = require '../../../js/views/loginform'

describe 'Login Form', ->
  lf = new LoginForm()

  it 'should be in login mode by default', ->
    lf.mode.should.eql(1)
