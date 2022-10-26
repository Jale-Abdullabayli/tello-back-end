const Category = require("../model/category");
const { asyncCatch } = require("../utils/asyncCatch");
const GlobalFilter = require("../utils/GlobalFilter");
const cloudinary = require("../utils/cloudinary");


exports.getAllCategories = asyncCatch(async (req, res) => {
    let allCategories = await new GlobalFilter(Category.find(), req.query);
    allCategories.filter();

    const categories = await allCategories.query;

    res.json({
        success: true,
        data: {
            categories
        }
    });

})


exports.createCategory = asyncCatch(async (req, res) => {
    const data = await cloudinary.uploader.upload(req.file.path,{public_id: `tello/categoryImages/${req.body.name}`});

    let newCategory = await Category.create({
        ...req.body, photo: data.secure_url,
        photoId: data.public_id
    });

    res.json({
        success: true,
        data: {
            newCategory
        },
    });

})