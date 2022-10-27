const express = require("express");
const router = express.Router();
const variantController=require('../controller/variantController');
const { privateRoute, access  } = require("../middleware/privateRoute");



router.get("/", variantController.getAllVariants);
router.post("/",privateRoute,access("admin"),variantController.createVariant);


module.exports = router;