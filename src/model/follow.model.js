const mongoose = require('mongoose');
const followSchema = new mongoose.Schema({
    follower:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"users",
        type:String,
        required:[true, "Follower is required"]
    },
    followee:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"users",
        type:String,
        required:[true, "Followee is required"]
    }
}, {timestamps:true})

const followModel = mongoose.model("follow",followSchema)
module.exports = followModel;