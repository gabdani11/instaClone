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

followSchema.index({ follower: 1, followee: 1 }, { unique: true })  //this will create the index(for fast sorting) and create it unique so no dublication

const followModel = mongoose.model("follow",followSchema)
module.exports = followModel;