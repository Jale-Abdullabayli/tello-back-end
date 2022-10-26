const express = require("express");
const router = express.Router();
const variantController=require('../controller/variantController');



router.get("/", variantController.getAllVariants);
router.post("/", variantController.createVariant);


module.exports = router;