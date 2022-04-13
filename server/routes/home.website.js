const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const authUser = require("../middleware/authuser");
const HomeWebsiteController = require("../controllers/Home.WebsiteController");

// router
//   .route("/getBorhanUsers")
//   .post(isAdmin.isAdmin, BorhanController.showBorhanUsers);
// router
//   .route("/deleteBorhanUserByAdmin/:_id")
//   .delete(isAdmin.isAdmin, BorhanController.deleteBorhanUserByAdmin);
// router
//   .route("/getUserDetails")
//   .post(isAdmin.isAdmin, BorhanController.getUserDetails);
router
  .route("/getOnlineExperts")
  .get( HomeWebsiteController.showOnlineExperts);
  router
  .route("/getBorhanUserDetails")
  .get( authUser.checkAuth,HomeWebsiteController.showBorhanUserDetails);

module.exports = router;
