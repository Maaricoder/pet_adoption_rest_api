
const pet_model = require("../model/pet_model")
const fs = require("fs");
const path = require("path");
 class pet_controllers {
    static create=async(re,res)=>{
        try {
            console.log(re.files);
            const {name,age,color,breed,descreption,imageLabel,category} =re.body;
            const {image,additionalImages} = re.files;

            let imagepath = "";
            let addimages= [];
            if(image && image.length > 0){
                imagepath= image[0].path;
            }

            if(additionalImages && additionalImages.length >0){
                addimages = additionalImages.map(file=>file.path)
            }

            const created = await pet_model.create({
                name,
                age
                ,color
                ,breed,
                descreption,
                imageLabel,
                category,
                image:imagepath,
                additionalImages:addimages


            })

            res.json({
                message:"successs",
                created
            }).status(200)


            
        } catch (error) {
            console.log("error from pet create",error)
            res.status(400).json({
                message:"fail"
            })
            
        }

        

    }

    // GET ALL PET CONTROLLER 

    static getall=async(re,res)=>{
        try {

            const getall = await pet_model.find()

            res.json({
                message:"success",
                getall
            }).status(200)




            
        } catch (error) {
            console.log("get all pet error",error)
            res.json({
                message:"fail"
            }).status(400)
            
        }
    }


    // GET PET BY ID  
    static getbyid=async(re,res)=>{
        try {
            const {id } = re.params;

            if(id){
                const findonepet = await pet_model.findById(id);
                res.json({
                    message:"success",
                    findonepet
                })


            }
            
        } catch (error) {
            console.log(error)
            
        }
    }

    // UPDATE IMAGE AND DATA BY ID 

    static updatabyid=async(re,res)=>{
        try {
            console.log(re.files);
            const {id} = re.params;
            const {name,age,color,breed,descreption,imageLabel,category} =re.body;
            const {image,additionalImages} = re.files;

            let imagepath = "";
            let addimages= [];
            if(image && image.length > 0){
                imagepath= image[0].path;
            }

            if(additionalImages && additionalImages.length >0){
                addimages = additionalImages.map(file=>file.path)
            }


            const existingpath = await pet_model.findById(id)

            if(imagepath.length ===0){
                addimages = existingpath.additionalImages
            }else{
             Promise.all(existingpath.additionalImages.map(async(img)=>{
                    await fs.unlink(path.join(__dirname, "../", img), (err,res)=>{
                        if(err){
                            console.log(err)
                        }else{
                            console.log(res)
                        }
                    })
                })).then(console.log)
                .catch(console.log)
            }

            if(imagepath.length ===0){
                imagepath = existingpath.image
            }else{
                await fs.unlink(path.join(__dirname,'../', existingpath.image),(err,res)=>{
                    if(err){
                        console.log(err)
                    }else{
                       return;
                    }
                })
            }

            const updated = await pet_model.findByIdAndUpdate(id,{
                name,
                age
                ,color
                ,breed,
                descreption,
                imageLabel,
                category,
                image:imagepath,
                additionalImages:addimages


            },{new:true})

            res.json({
                message:"successs pet updated",
                updated
            }).status(200)


            
        } catch (error) {
            console.log("error from pet create",error)
            res.status(400).json({
                message:"fail"
            })
            
        }

        

    }

    // DELETE PET CONTROLLER 


    static delete_pet=async(re,res)=>{
        try {
            const {id} = re.params

            

            const itexist = await pet_model.findById(id) 

            if(!itexist){
                return res.json({
                    message:"pet not found"
                })
                
            }else{

                const deleted = await pet_model.findByIdAndRemove(id)

                res.json({
                    message:"pet deleted success",
                    deleted
                    
                })

            }
            
            
        } catch (error) {
            console.log(error)
            
        }
    }












 }




 module.exports = pet_controllers;