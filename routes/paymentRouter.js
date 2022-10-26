const express = require("express");
const router = express.Router();
const paymentController=require('../controller/paymentController');
const { privateRoute } = require("../middleware/privateRoute");


router.post("/checkout", privateRoute,paymentController.checkout);


module.exports = router;