const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const BorhanController = require("../controllers/BorhanUser.Admin");
const AppController = require("../controllers/App.Controller");

router
  .route("/getBorhanUsers")
  .post(isAdmin.isAdmin, BorhanController.showBorhanUsers);

router
  .route("/getTestimonies")
  .get(isAdmin.isAdmin, AppController.getTestimonies);
router
  .route("/getTestimonyByIdForAdmin")
  .get(isAdmin.isAdmin, AppController.getTestimonyByIdForAdmin);
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
