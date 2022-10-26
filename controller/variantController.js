const Variant = require("../model/variant");
const { asyncCatch } = require("../utils/asyncCatch");


exports.getAllVariants = asyncCatch(async (req, res) => {
    let variants = await Variant.find();

    res.json({
        success: true,
        data: {
            variants
        }
    });

})


exports.createVariant = asyncCatch(async (req, res) => {
    let newVariant = await Variant.create(req.body);

    res.json({
        success: true,
        data: {
            newVariant
        },
    });

})