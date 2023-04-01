const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const cors = require("cors")
const path = require("path")
const morgan = require('morgan')
// app.use(express.urlencoded())
app.use(express.json())
app.use(morgan("tiny"))
app.use(cors());
require('dotenv').config()


app.use("/public", express.static(path.join(__dirname, "public")));


const connectDB =require("./database/database")

// category router 
const category_routes =require("./routes/category_route")

// pet router 
const pet_routes = require("./routes/pet_route")

// adoption router 
const adoption_router = require("./routes/adoption")




// const bodyParser = require('body-parser');


// ROUTES 

app.use("/api/category",category_routes)
app.use("/api/pets",pet_routes)
app.use("/api/adoption",adoption_router)





// const connectDB = require("./database/database")

const port = process.env.PORT

// const mongoUrl ="mongodb://127.0.0.1:27017/petdatabase"

//  database connection function 
connectDB(process.env.MONGO_URL);





app.listen(port,()=>{
    console.log(`port is listen ${port}`)
})