const { asyncCatch } = require("./asyncCatch");
const GlobalError = require("../error/GlobalError");

const deleteOne = (Model) =>
  asyncCatch(async (req, res, next) => {
    const id = req.params.id;

    let deleted = await Model.findOneAndDelete({
      _id: id,
    });

    if (!deleted) return next(new GlobalError("Invalid Id: DELETE", 404));
    res.status(200).json({
      success: true,
      message: "deleted",
    });
  });


const updateOne = (Model) =>
  asyncCatch(async (req, res, next) => {
    const id = req.params.id;
    const updated = await Model.findByIdAndUpdate(id, req.body);
    if (!updated) return next(new GlobalError("Invalid id: UPDATE", 500));

    res.status(200).json({
      success: true,
      message: "updated"
    });
  });

module.exports = { deleteOne, updateOne };
