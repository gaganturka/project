const express = require("express");
const router = express.Router();
const userCreation = require("../controllers/User_Creation.js");
const imageupload=require("../middleware/imageupload")
router.route("/createuser").post(imageupload.upload, userCreation.createBorhanUser);


module.exports = router;
