const { default: mongoose } = require("mongoose");

const adoption_schema = mongoose.Schema({

    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    address:{
        type:String
    },
    phone:{
        type:String,
        require:true
    },
    pet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"pet",
        require:true
    }

},
{
    timestamps:true
}
)

module.exports = adoption_model = mongoose.model("adoption",adoption_schema)