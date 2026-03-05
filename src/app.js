const express = require('express');
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/auth.route")
const postRouter = require("./routes/post.route")
const userRouter = require("./routes/user.route")
const cors = require('cors')
const app = express();
app.use(express.json()) //let body data read
app.use(cookieParser()) //using cookie ont app
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173", //on this url let credential pass
    methods: [ "GET", "POST", "PUT", "DELETE" ],  //used for cors credential
}))

// Api of authentication
app.use("/api/auth",authRouter)
//Api for post 
app.use("/api/posts",postRouter)
//Api for Follow,like
app.use("/api/users",userRouter)
module.exports = app;