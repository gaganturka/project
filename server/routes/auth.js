const express = require("express");
const router = express.Router();
const userCreation = require("../controllers/Auth.js");
const isAdmin = require("../middleware/isAdmin");
const Upload = require("../controllers/Upload");
router.route("/createborhanuser").post(userCreation.createBorhanUser);
router.route("/googleLoginSignup").post(userCreation.googleLoginSignup);
router.route("/facebookLoginSignup").post(userCreation.facebookLoginSignup);

router.route("/uploadfile").post(Upload.Upload);
router.route("/createexpertuser").post(userCreation.createExpertUser);
router
  .route("/createexpertuserbyadmin")
  .post(isAdmin.isAdmin, userCreation.createExpertUserByAdmin);
router.route("/login").post(userCreation.login);
router.route("/adminlogin").post(userCreation.adminLogin);
router.route("/generateotp").post(userCreation.otpGeneration);
router.route("/otpsendertofrontend").post(userCreation.otpSenderToFrontend);

module.exports = router;
