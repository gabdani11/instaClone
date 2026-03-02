const express = require('express')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
const userRoute = express.Router();

userRoute.post("/follow/:username",authMiddleware, userController)

module.exports = userRoute;