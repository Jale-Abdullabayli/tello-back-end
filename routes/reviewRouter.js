const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController =require('../controller/reviewController');
const { privateRoute } = require("../middleware/privateRoute");


router.get("/", privateRoute, reviewController.getReviewsByProductId);
router.post("/",privateRoute, reviewController.createReview);

module.exports = router;