const express = require("express");
const router = express.Router();
const userCreation = require("../controllers/UserCreation.js");
const imageUpload=require("../middleware/imageUpload")
const audioUpload=require("../middleware/audioUpload")
const videoUpload=require("../middleware/videoUpload")
const documentUpload=require("../middleware/documentUpload")
const isAdmin=require("../middleware/isAdmin")
const Upload=require("../controllers/Upload")
router.route("/createuser").post( userCreation.createBorhanUser);
router.route("/uploadfile").post(Upload.Upload)
router.route("/createexpertuser").post( userCreation.createExpertUser);
router.route("/createexpertuserbyadmin").post(isAdmin.isAdmin ,userCreation.createExpertUserByAdmin);
router.route("/login").post( userCreation.login);
router.route("/adminlogin").post( userCreation.adminLogin);
router.route("/generateotp").post( userCreation.otpGeneration);
router.route("/otpsendertofrontend").post( userCreation.otpSenderToFrontend);

module.exports = router;

