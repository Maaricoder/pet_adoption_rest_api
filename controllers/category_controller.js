
const category_model = require("../model/category_model")
class category_controller {
    static category_getall= async(re,res)=>{

        try {

            const category = await category_model.find()

            res.json({
                status:"success",
                category
            }).status(200)

            
        } catch (error) {

            console.log(error)
            
        }

       

    }

    // create api controller 

    static create_category=async(re,res)=>{
        try {

            const {name} = re.body;
       
           const created = await category_model.create({name});

           res.json({
            message:"success",
            created
           });



            
        } catch (error) {

            console.log("create api error",error)
            
        }
    }


    // UPDATE API CONTROLLER 

    static update_category=async(re,res)=>{
        const {id} = re.params
        const {name} = re.body;

        const findname = await category_model.findById(id)
        

        if(!findname){

            res.json({
                message:"id not found"
            })
          
        }else{
            const updated = await category_model.findByIdAndUpdate( id, {name}, {new:true} )
            res.json({
                message:"update success",
                updated
            })
           
        }
        

    }


    static delete_category=async(re,res)=>{
        try {

            const {id}= re.params;

            const findId = await category_model.findById(id);

            if(!findId){
                res.json({
                    message:"id not found"

                })
            }else{
                const deleted = await category_model.findByIdAndRemove(id);
                res.json({
                    message:" deleted success ",
                    deleted
                })
            }



            
        } catch (error) {

            console.log("delete category error",error)
            
        }
    }
}


module.exports= category_controller