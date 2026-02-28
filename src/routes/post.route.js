const express = require("express");
const postRoute = express.Router();
const postController = require('../controllers/post.controller')
const identifiesUser = require("../middleware/auth.middleware")//added a middleware 
const multer = require('multer') //using multer to read form data

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })  //using multer to store the file into localStorage

postRoute.post("/",identifiesUser,upload.single("image"),postController.postCreation)
postRoute.get("/getpost",identifiesUser,postController.getPosts)
postRoute.get("/getpost/detail/:postId",identifiesUser,postController.detailPost) //getting postId from user as dynamic routing


module.exports = postRoute;