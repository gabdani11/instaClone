const postModel = require('../model/post.model')
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

async function postCreation(req,res){

   

    
    const imageKit = new ImageKit({
  privateKey: process.env['IMAGEKIT_KEY'], //give api key
});
     
     

const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })
    

    const post = await postModel.create({
        caption:req.body.caption,
        imageUrl:file.url,       //uploading post detail to database
        userId:req.user.id
    })
   res.status(201).json({
    message:"Post uploaded"
   })

}

//getting post of the user
async function getPosts(req,res){
    
   
    const id = req.user.id
    const posts = await postModel.find({userId:id})  //find all data who contain this userId
    res.status(200).json({
        message:"Post fetch",
        posts
    })  
}
// postdetail api
 async function detailPost(req, res){
   const postId = req.params.postId; //endpoint, dynamic postId

   
   const post = await postModel.findById(postId)
   

   const checkUserCorrect = req.user.id == post.userId.toString()
   if(!checkUserCorrect)
   {
    res.status(401).json({
        Message:"Post not found"
    })
   }
   res.status(200).json({
    Message:"Here is your post",
    post

   })


 }
module.exports = {postCreation,getPosts,detailPost};