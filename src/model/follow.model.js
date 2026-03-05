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
    },
    status: {
        type: String,
        default: "pending",   //this is a value that have default pending and only can ppass pending,accepted,rejected if any other value is passed then it causes error
        enum: {
            values: [ "pending", "accepted", "rejected" ],
            message: "status can only be pending, accepted or rejected"
        }
    }
}, {timestamps:true})

followSchema.index({ follower: 1, followee: 1 }, { unique: true })  //this will create the index(for fast sorting) and create it unique so no dublication

const followModel = mongoose.model("follow",followSchema)
module.exports = followModel;