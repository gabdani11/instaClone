const express = require("express");
const postRoute = express.Router();
const postController = require('../controllers/post.controller')
const multer = require('multer') //using multer to read form data

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })  //using multer to store the file into localStorage

postRoute.post("/",upload.single("image"),postController.postCreation)
postRoute.get("/getpost",postController.getPosts)

module.exports = postRoute;