const { asyncCatch } = require("../utils/asyncCatch");
const GlobalError = require("../error/GlobalError");
const User = require("../model/user");

exports.changeUserData = asyncCatch(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    email: req.body.email,
    surname: req.body.surname,
  },{new: true});

  res.status(200).json({ success: true, data: { user } });
});