const express = require('express')
const authRouter = express.Router();
const authController = require('../controllers/auth.controller')

//register api
authRouter.post('/register',authController.registerController)

//Login api
authRouter.post("/login",authController.loginController)
module.exports = authRouter;