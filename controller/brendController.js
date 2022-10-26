const Brend = require("../model/brend");
const { asyncCatch } = require("../utils/asyncCatch");
const { deleteOne,updateOne } = require("../utils/factory");


exports.getAllBrends = asyncCatch(async (req, res) => {
    const brends = await Brend.find();

    res.json({
        success: true,
        data: {
            brends
        }
    });

})


exports.createBrend = asyncCatch(async (req, res) => {

    let brend = await Brend.create({
        ...req.body
    });

    res.json({
        success: true,
        data: {
            brend
        },
    });

})



exports.updateBrend = updateOne(Brend);
exports.deleteBrend = deleteOne(Brend);