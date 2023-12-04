
const express = require('express')
const router = require('./routes/UserRouter')
const RegisterUserController = require('./controllers/RegisterUserController')
const EditUserController = require('./controllers/EditUserController')
const DeleteUserController = require('./controllers/DeleteUserController')
const ChangePwdUserController = require('./controllers/ChangePwdUserController')
const RecoverPwdUserController = require('./controllers/RecoverPwdUserController')
const RecoverPwdEmailUserController = require('./controllers/RecoverPwdEmailUserController')
const LoginController = require('./controllers/LoginController')
const ValidateAuthController = require('./controllers/ValidateAuthController')
const LogMockAdapter = require('./adapters/LogMockAdapter')
const cors = require( 'cors' )
const ResetDatabaseController = require('./controllers/ResetDatabaseController')
function makeApp (userRepository, logAdapter = new LogMockAdapter()) {
  const app = express()
  app.use( cors() );
  app.use(express.json())
  app.set('logService', logAdapter)
  app.set('registerUserController', new RegisterUserController(userRepository, logAdapter))
  app.set('editUserController', new EditUserController(userRepository, logAdapter))
  app.set('deleteUserController', new DeleteUserController(userRepository, process.env.SECRET_JWT || 'secret', logAdapter))
  app.set('changePwdUserController', new ChangePwdUserController(userRepository, process.env.SECRET_JWT || 'secret', logAdapter))
  app.set('recoverPwdUserController', new RecoverPwdUserController(userRepository, process.env.SECRET_JWT || 'secret', logAdapter))
  app.set('recoverPwdEmailUserController', new RecoverPwdEmailUserController(userRepository, process.env.SECRET_JWT || 'secret', logAdapter))
  app.set('loginController', new LoginController(userRepository, process.env.SECRET_JWT || 'secret', logAdapter))
  app.set('validateAuthController', new ValidateAuthController(userRepository, process.env.SECRET_JWT || 'secret', logAdapter))
  app.set('resetDatabaseController', new ResetDatabaseController(userRepository, process.env.SECRET_JWT || 'secret', logAdapter))
  app.use('/users', router)
  return app
}
module.exports = makeApp
