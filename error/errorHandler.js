const GlobalError = require("../error/GlobalError");

function sendDevError(err, req, res, statusCode) {
  res.status(statusCode).json({
    message: err.message,
    error: err,
    code: statusCode,
    stack: err.stack,
  });
}
function sendProdError(err, req, res) {
  if (err.Operational) {
    res.json({
      success: false,
      message: err.message,
    });
  } else {
    res.json({
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


module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, req, res, statusCode);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") {
      err = handlerCastError(err);
    } 
    else if (err.name === "TokenExpiredError") err = handleTokenExpire(err);
    else if (err.name === "JsonWebTokenError") err = handleTokenError(err);
    sendProdError(err, req, res);
  }
};