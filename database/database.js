// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose")


 const connectDB=async(url)=>{
    try {

         mongoose.connect(url)
        .then(()=>console.log("database is connected"));
        
    } catch (error) {
        console.log("error from mongoose",error)
    
    }

}


module.exports = connectDB;




