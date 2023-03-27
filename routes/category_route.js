const express = require("express")
const router = express.Router()

const category_controllter = require("../controllers/category_controller")

// GET ALL CATEGORY ROUTE 
 router.get("/all",category_controllter.category_getall)



//  CREATE CATAEGORY ROUTE 

router.post("/create",category_controllter.create_category)


// UPDATE CATEGORY ROUTE 

router.put("/update/:id",category_controllter.update_category);


// UPDATE CATEGORY ROUTE 

router.delete("/delete/:id",category_controllter.delete_category);




 module.exports = router


