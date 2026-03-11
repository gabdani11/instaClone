const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"Username is required"]

    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is required"],
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:false //this will prevent to let this read.. so this will not show on the frontend while calling api
    },
    bio:{
        type:String,
        default:""
    },
    profile:{
        type:String,
        default:"https://ik.imagekit.io/rhuubreuu/defaultinstagramprofile.webp"
    }
},{timestamps:true})
const authModel = mongoose.model("user",userSchema)
module.exports = authModel;