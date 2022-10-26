const GlobalError = require("../error/GlobalError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { asyncCatch } = require("../utils/asyncCatch");
const User = require("../model/user");


const privateRoute = asyncCatch(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new GlobalError("Please provide a token!"));

  const verifiPromise = promisify(jwt.verify);

  const userInfo = await verifiPromise(token, process.env.JWT_SIGNATURE);

  const user = await User.findById(userInfo.id);

  if (!user)
    return next(
      new GlobalError("Token that belongs to user is no longer exist!", 403)
    );

  req.user = user;

  next();
});

const access = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req?.user?.role)) {
      return next(new GlobalError("You have not permission", 403)); 
    }

    next();
  };
};

module.exports = { privateRoute, access };