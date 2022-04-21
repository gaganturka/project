const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const authUser = require("../middleware/authuser");
const WebsiteController = require("../controllers/WebsitePanel.Controller");

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
  .get( WebsiteController.showOnlineExperts);
  router
  .route("/getBorhanUserDetails")
  .get( authUser.checkAuth,WebsiteController.showBorhanUserDetails);
  router
  .route("/editBorhanUserDetails")
  .put( authUser.checkAuth,WebsiteController.editBorhanUserDetails);
  router
  .route("/getFilteredOnlineExperts")
  .post( WebsiteController.getFilteredOnlineExperts);
  router
  .route("/getPracticeAreaDataSearched")
  .post( WebsiteController.getPracticeAreaDataSearched);
  
    router
    .route("/getFilteredOnlinePremiumExperts")
    .post( WebsiteController.getFilteredOnlinePremiumExperts);
    router
      .route("/getOnlinePremiumExperts")
      .get(WebsiteController.getOnlinePremiumExperts);
    router.route("/getSingleExpert").get(WebsiteController.getSingleExpert);
    
  
  module.exports = router;
