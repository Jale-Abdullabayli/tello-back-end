const multer = require("multer");

const multerUpload = multer({
  storage: multer.diskStorage({}),
 
});

module.exports = multerUpload;