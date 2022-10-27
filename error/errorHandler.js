const GlobalError = require("../error/GlobalError");

function sendDevError(err, req, res, statusCode) {
  res.status(statusCode).json({
    message: err.message,
    error: err,
    code: statusCode,
    stack: err.stack,
  });
}
function sendProdError(err, req, res,statusCode) {
  if (err.Operational) {
    res.status(statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message: "Ops! Something went wrong...",
    });
  }
}

const handlerCastError = (err) => {
  return new GlobalError("Id must be Object id type!", 400);
};


const handleTokenExpire = (err) => {
  return new GlobalError("Session time out. Please Log in again", 403);
};

const handleTokenError = (err) => {
  return new GlobalError("Invalid Token", 403);
};

function handleValidationError(err) {
  const err = Object.values(err.errors).join(" ");
  return new GlobalError(err, 400);
}


module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, req, res, statusCode);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") {
      err = handlerCastError(err);
    }
    else if (err.name === "ValidationError") err = handleValidationError(err);
    else if (err.name === "TokenExpiredError") err = handleTokenExpire(err);
    else if (err.name === "JsonWebTokenError") err = handleTokenError(err);
    sendProdError(err, req, res,statusCode);
  }
};