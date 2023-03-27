const express = require("express");

const adoption_controller = require("../controllers/adoption_controller")


const router = express.Router()


router.get("/getall",adoption_controller.getall)
router.get("/get/:id",adoption_controller.getOne)

router.post("/create",adoption_controller.create)
router.put("/update/:id",adoption_controller.update)
router.delete("/delete/:id",adoption_controller.delete)



module.exports= router