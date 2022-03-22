const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.js");
const imageupload=require("../middleware/imageupload")
// router.route("/createuser").post(imageupload.upload, auth.createuser);


module.exports = router;

