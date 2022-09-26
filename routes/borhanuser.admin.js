const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const BorhanController = require("../controllers/BorhanUser.Admin");
const AppController = require("../controllers/App.Controller");

router
  .route("/getBorhanUsers")
  .post(isAdmin.isAdmin, BorhanController.showBorhanUsers);
// testimonies routes started
router
  .route("/getTestimonies")
  .get(isAdmin.isAdmin, AppController.getTestimonies);

router
  .route("/getTestimonyByIdForAdmin")
  .get(isAdmin.isAdmin, AppController.getTestimonyByIdForAdmin);

router
  .route("/addTestimonyByAdmin")
  .post(isAdmin.isAdmin, AppController.addTestimonyByAdmin);

router
  .route("/editTestimonyByAdmin")
  .post(isAdmin.isAdmin, AppController.editTestimonyByAdmin);

router
  .route("/deleteTestimonyByAdmin")
  .post(isAdmin.isAdmin, AppController.deleteTestimonyByAdmin);

// testimonies routes ended
// user request routes started
router
  .route("/editUserRequestByAdmin")
  .post(isAdmin.isAdmin, AppController.editUserRequestByAdmin);

router
  .route("/deleteUserRequestByAdmin")
  .post(isAdmin.isAdmin, AppController.deleteUserRequestByAdmin);

router
  .route("/getAllUserRequestsForAdmin")
  .get(isAdmin.isAdmin, AppController.getAllUserRequestsForAdmin);

router
  .route("/getUserRequestById")
  .get(isAdmin.isAdmin, AppController.getUserRequestById);

// user request routes ended
router
  .route("/deleteBorhanUserByAdmin/:_id")
  .delete(isAdmin.isAdmin, BorhanController.deleteBorhanUserByAdmin);
router
  .route("/getUserDetails")
  .post(isAdmin.isAdmin, BorhanController.getUserDetails);
router.route("/addQuesAndAns").post(BorhanController.addQuesAndAns);
router.route("/editQuesAndAns").post(BorhanController.editQuesAndAns);
router.route("/getQuesAndAns").get(BorhanController.getQuesAndAns);
router.route("/deleteQuesAndAns").post(BorhanController.deleteQuesAndAns);
router.route("/getQuesAndAnsById").post(BorhanController.getQuesAndAnsById);

module.exports = router;
