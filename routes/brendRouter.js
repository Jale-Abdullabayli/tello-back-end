const express = require("express");
const router = express.Router();
const brendController=require('../controller/brendController');
const { privateRoute, access } = require("../middleware/privateRoute");


router.get("/", brendController.getAllBrends);
router.post("/", brendController.createBrend);
router.delete("/:id", privateRoute, access("admin"), brendController.deleteBrend);
router.patch("/:id", privateRoute, access("admin"), brendController.updateBrend);

module.exports = router;