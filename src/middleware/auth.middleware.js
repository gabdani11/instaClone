const jwt = require("jsonwebtoken")
async function identifiesUser(req,res,next){

const token = req.cookies.token //taking token from cookies
     
     if(!token){
      return res.stauts(401).json({    //if not toke then this
            message:"Unauthorized access"
        })
     }
     let decoded ;
     try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)   /* This is a middleware file and here the token is taken as req.cookies and verify using jwt and send back to req.user = decoded and can access as req.user in other components*/
     }catch(error){
        return res.status(401).json({
            message: "user not authorized"
        })
    }
    req.user = decoded;
    next();

}
module.exports = identifiesUser;