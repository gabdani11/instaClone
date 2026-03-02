const followModel = require("../model/follow.model")
const authModel = require('../model/auth.model')
async function followUserController(req,res)
{
    const followerUsername = req.user.username; //taking who u want to follow username from dynamic routing
    const followeeUsername = req.params.username;
    console.log(followeeUsername)//taking who is the follower username from token middleware

    if(followerUsername == followeeUsername)
    {
       return res.status(200).json({
            message:"You can not follow yourself"    //if bothe is equal
        })
    }
    const isFolloweeUsernameExist = await authModel.findOne({
        username:followeeUsername
    })
    if(!isFolloweeUsernameExist){
       return res.status(404).json({
            message:"User you are trying to follow does not exist"
        })
    }
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if(isAlreadyFollowing){
       return res.status(201).json({
            message:`you are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }
    const followRecord = await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
    })
    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow:followRecord
    })

}
module.exports = followUserController;