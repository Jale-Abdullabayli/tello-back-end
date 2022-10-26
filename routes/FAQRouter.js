const express = require("express");
const router = express.Router();
const FAQController=require('../controller/FAQController');
const { privateRoute, access } = require("../middleware/privateRoute");


router.get("/", FAQController.getAllFAQ);
router.post("/", FAQController.createFAQ);
router.patch("/:id",privateRoute, access("admin"), FAQController.updateFAQ);
router.delete("/:id",privateRoute, access("admin"), FAQController.deleteFAQ);


module.exports = router;