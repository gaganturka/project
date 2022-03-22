const multer=require('multer');
const path=require('path');
let upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"../images/"));
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //use Date.now() for unique file keys
      },
    }),
    limits: {
      fileSize: "50mb",
    },
  }).single("file");
  

  module.exports={
      upload,
  }