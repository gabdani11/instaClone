const express = require('express')
const authRouter = express.Router();
const authController = require('../controllers/auth.controller')
const middleware = require('../middleware/auth.middleware')

//register api
authRouter.post('/register',authController.registerController)

//Login api
authRouter.post("/login",authController.loginController)
//getme api
authRouter.get("/get-me",middleware,authController.getMeController)
module.exports = authRouter;