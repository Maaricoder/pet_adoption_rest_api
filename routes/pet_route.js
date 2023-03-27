const express = require("express");
const multer = require("multer");
const fs = require("fs");


const pet_controller = require("../controllers/pet_controller");
const path = require("path");
const { normalize } = require("path");
const { route } = require("./category_route");


const router = express.Router();

const storage = multer.diskStorage({
    destination:(re,file,cb)=>{
        if (!fs.existsSync( "public" )) {

            fs.mkdirSync( "public" );
        }

        if(!fs.existsSync("public/images")){
            fs.mkdirSync("public/images");
        }
        cb(null,"public/images");

    },
    filename:(re,file,cb)=>{
        // cb(null,Date.now()  + file.originalname)
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})

const upload = multer({
    storage:storage,
    fileFilter:(re,file,cb)=>{
        const ext = path.extname(file.originalname);

        if(ext !==".png" && ext !==".jpeg" && ext !==".jpg" ){
            return cb(new Error("only imges allowed"))
        }
 
        cb(null,true)
        
    }
})


// PET ROUTER WITH IMGAE UPLOAD 

router.post("/create",upload.fields([
    {
        name:"image",
        maxCount:1
    },
    {
        name:"additionalImages",
        maxCount:5
    }
]),pet_controller.create)

// FOR UPDATE PET  ROUTE
router.put("/update/:id",upload.fields([
    {
        name:"image",
        maxCount:1
    },
    {
        name:"additionalImages",
        maxCount:5
    }
]),pet_controller.updatabyid)




//GET ALL PET ROUTER
router.get("/getall",pet_controller.getall)

router.get("/get/:id",pet_controller.getbyid)

router.delete('/delete/:id',pet_controller.delete_pet)



module.exports = router