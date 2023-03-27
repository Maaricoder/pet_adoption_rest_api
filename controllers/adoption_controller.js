
const { model } = require("mongoose")
const adoption_model = require("../model/adoption_model")
class adoption_controller {

    // GET ALL CONTROLLER 
    static getall=async(re,res)=>{
        
        const getalldata = await adoption_model.find()

        res.json({
            message:"success",
            getalldata
        })

    }


    // ADIPTION CREATE CONTROLLER 
    
    static create =async(re,res)=>{
        try {

            const {fullname , email , address , phone ,pet } = re.body;

            const created = await adoption_model.create({
                fullname,
                email,
                address,
                phone,
                pet
            })

            res.json({
                message:"success created",
                created
            }).status(200)
            
        } catch (error) {
            console.log(error)
            
        }
    }

    // GET BY ID CONTROLLER 

    static getOne=async(re,res)=>{

        const {id } = re.params;
        
        const find = await adoption_model.findById(id)

        res.json({
            message:"success",
            find
        })

    }



    // UPDATE CONTROLLER  

    static update =async(re,res)=>{
        try {

            const {id} = re.params
            const {fullname , email , address , phone ,pet } = re.body;

            const created = await adoption_model.findByIdAndUpdate(id, {
                fullname,
                email,
                address,
                phone,
                pet
            } ,{new:true})

            res.json({
                message:"success created",
                created
            }).status(200)
            
        } catch (error) {
            console.log(error)
            
        }
    }

    static delete=async(re,res)=>{
        const {id} = re.params

        const idExist = await adoption_model.findById(id);

            if(!idExist){
                res.json({
                    message:"data not found",

                })
            }else{
                const deleted = await adoption_model.findByIdAndRemove(id);
                res.json({
                    message:"success data deleted",
                    deleted
                })
            }
    }
}

module.exports = adoption_controller;