const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dtdcqn7f6",
  api_key: "837276851524617",
  api_secret: "VZ3A7qvmhE8yTd1pxZ48mLJyMsc",
  secure: true,
});

module.exports = cloudinary;