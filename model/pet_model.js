const { default: mongoose } = require("mongoose");


const pet_model = mongoose.Schema(
    {

    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    descreption:{
        type:String,
      
    },
    breed:{
        type:String,
        required:true
    },
    image:{
        type:String,
      
    },
    imageLabel:{
        type:String,
      
    },
    additionalImages:[{
        type:String

    }],
    category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"category"
    }

},
{
    timestamps:true
}
)

module.exports = pet = mongoose.model("pet",pet_model)