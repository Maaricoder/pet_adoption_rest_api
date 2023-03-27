const { default: mongoose } = require("mongoose");

const Category_schema = mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports = Category = mongoose.model("category",Category_schema)
