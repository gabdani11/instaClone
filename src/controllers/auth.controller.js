
const authModel = require('../model/auth.model')
// const crypto = require('crypto');not going to use this instead
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
//register api
async function registerController(req,res){

    const {username,email,password,bio,profile}=req.body;
    const checkUser = await authModel.findOne({
        $or:[
        {username},
        {email}
    ]});
    if(checkUser){
       return res.status(409).json({
            message:checkUser.email==email?"Email already exist":"Username already exist"
        })
    }
    const hash = await bcrypt.hash(password,10)
    const user = await authModel.create({
        username,
        email,
        password:hash,
        bio,
        profile


    })
    const token = jwt.sign({
        id:user._id

    },
    process.env.JWT_SECRET
    )
    res.cookie("token",token,{maxAge: 24 * 60 * 60 * 1000});
    res.status(200).json({
        message:"User register",
        username:user.username,
        email:user.email,
        bio:user.bio,
        profile:user.profile


    })


    
}

//Login api
async function loginController(req,res){
    const {username,email,password} = req.body;
    const checkUserExist = await authModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!checkUserExist){
        return res.status(401).json({
            message:"User don't exist"

        })
    }
    const checkPassword = await bcrypt.compare(password, checkUserExist.password)
    if(!checkPassword){
        return res.status(401).json({
            message:"Password is incorrect"
        })
    }
    const token = jwt.sign({
       id:checkUserExist._id
    },
    process.env.JWT_SECRET
)
    res.cookie('token',token,{
        maxAge: 24 * 60 * 60 * 1000})
    res.status(200).json({
        message:"Login user",
        User:checkUserExist.username,

    })
}
module.exports = {
    registerController,
    loginController
}