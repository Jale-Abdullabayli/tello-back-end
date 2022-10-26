const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { privateRoute, access } = require("../middleware/privateRoute");
const reviewRouter = require("./reviewRouter");
const upload = require("../utils/multer");

router.use("/:productId/reviews", reviewRouter);


router.get("/", productController.getAllProducts);
router.post("/", upload.any(), privateRoute,access("admin"), productController.createProduct);
router.get("/price-range", productController.getPriceRange);
router.get("/:id", productController.getOneProduct);
router.delete("/:id", privateRoute, access("admin"), productController.deleteProduct);
router.patch("/:id", privateRoute, access("admin"), productController.updateProduct);

module.exports = router;