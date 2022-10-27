const express = require("express");
const router = express.Router();
const categoryController=require('../controller/categoryController');
const upload = require("../utils/multer");

router.get("/", categoryController.getAllCategories);
router.post("/",privateRoute,access("admin"),upload.single("photo"),categoryController.createCategory);


module.exports = router;