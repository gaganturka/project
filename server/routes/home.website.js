const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
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

module.exports = router;
