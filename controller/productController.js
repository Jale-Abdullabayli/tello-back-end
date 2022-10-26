const Product = require("../model/product");
const GlobalFilter = require("../utils/GlobalFilter");
const { asyncCatch } = require("../utils/asyncCatch");
const GlobalError = require('../error/GlobalError');
const cloudinary = require("../utils/cloudinary");
const { deleteOne,updateOne } = require("../utils/factory");

exports.getAllProducts = asyncCatch(async (req, res) => {
  let allProducts = new GlobalFilter(Product.find(), req.query);
  allProducts.search().filter().sort().paginate();

  const products = await allProducts.query;

  let countOfProducts = new GlobalFilter(Product.find(), req.query);
  countOfProducts.search().filter().sort().countOfProducts();

  const count = await countOfProducts.query;

  res.json({
    success: true,
    quantity: count,
    data: {
      products
    },
  });

})

exports.getOneProduct = asyncCatch(async (req, res) => {

  const id = req.params.id;

  const oneProduct = await Product.findById(id).populate("reviews");

  if (!oneProduct) return next(new GlobalError("Invalid Id: FINDONE", 404));


  res.status(200).json({
    success: true,
    data: {
      product: oneProduct,
    },
  });

})


exports.getPriceRange = asyncCatch(async (req, res) => {

  const theMostExpensive = await Product.find().sort({ price: -1 }).limit(1);
  const cheapest = await Product.find().sort({ price: 1 }).limit(1);

  res.status(200).json({
    success: true,
    data: {
      maxPrice: theMostExpensive[0].price,
      minPrice: cheapest[0].price
    }
  });

})


exports.createProduct = asyncCatch(async (req, res) => {
  productData = { ...req.body };
  for (let i = 0; i < req.files.length; i++) {
    let fieldname = req.files[i].fieldname;
    if (fieldname != "imageCover") {

      arrayOfFieldname = fieldname.split('-');
      const data = await cloudinary.uploader.upload(req.files[i].path, { public_id: `tello/productImages/${req.body.name}-${arrayOfFieldname[0]}-${arrayOfFieldname[1]}-${arrayOfFieldname[2]}` });
      let imageObj = { url: "", urlId: "" };
      imageObj.url = data.secure_url;
      imageObj.urlId = data.public_id
      if (!productData.variants[+arrayOfFieldname[0]].values[+arrayOfFieldname[1]].images) {
        productData.variants[+arrayOfFieldname[0]].values[+arrayOfFieldname[1]]["images"] = [];
      }
      productData.variants[+arrayOfFieldname[0]].values[+arrayOfFieldname[1]].images[+arrayOfFieldname[2]] = imageObj;
    }
    else {
      const data = await cloudinary.uploader.upload(req.files[i].path, { public_id: `tello/productCoverImages/${req.body.name}-coverImage` });
      productData.imageCover = data.secure_url;
      productData.imageCoverId = data.public_id;
    }

  }

  let newProduct = await Product.create(productData);

  res.json({
    success: true,
    data: {
      newProduct
    },
  });

})


exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);
