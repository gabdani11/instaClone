const mongoose = require('mongoose')
async function connectToDb(){

try{
    await mongoose.connect(process.env.MONGO_SERVER)
    console.log("Connect to Database")
}catch(error){
    console.log("Database connect fail", error.message)

}
}
module.exports = connectToDb;