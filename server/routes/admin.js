const express = require("express");
const router = express.Router();
const isAdmin=require("../middleware/isAdmin")
const categorieController = require("../controllers/CategoriesAndPracticeArea");
const AdminController = require("../controllers/AdminController");

router.route("/addCategories").post(isAdmin.isAdmin,categorieController.addCategories);
router.route("/editCategories/:id").put(isAdmin.isAdmin,categorieController.editCategories);
router.route("/getCategoriesData").get(categorieController.getCategoriesData);
router
  .route("/deleteCategories/:id")
  .delete(isAdmin.isAdmin,categorieController.deleteCategoriesData);
  router.route("/getCategoryDetails").get(categorieController.getCategoryDetails);

  router
  .route("/createPracticeArea")
  .post(isAdmin.isAdmin,categorieController.createPracticeArea);
  router  
  .route("/deletePracticeArea/:id")
  .delete(isAdmin.isAdmin,categorieController.deletePracticeArea);
  router.route("/editPracticeArea/:id").put(isAdmin.isAdmin,categorieController.editPracticeArea);
  
  router.route("/getPracticeAreaData").get(categorieController.getPracticeAreaData);
  router.route("/getPracticeAreaDataPopulated").get(categorieController.getPracticeAreaDataPopulated);

router
  .route("/getExpertApprovedByAdmin/:_id")
  .get(isAdmin.isAdmin,AdminController.getExpertApprovedByAdmin);
  router
  .route("/getExpertRejectedByAdmin/:_id")
  .get(isAdmin.isAdmin,AdminController.getExpertRejectedByAdmin);
  router.route("/getExperts").post(isAdmin.isAdmin,AdminController.showExperts);
  router.route("/getExpertsAccountTypeExpert").post(isAdmin.isAdmin,AdminController.showExpertsAccountTypeExpert);
  router.route("/getExpertsAccountTypeFreelancer").post(isAdmin.isAdmin,AdminController.showExpertsAccountTypeFreelancer);

  router.route("/getExpertsRequests").post(isAdmin.isAdmin,AdminController.showExpertsRequests);
  router.route("/getExpertDetails/:id").get(isAdmin.isAdmin,AdminController.showExpertDetails);
  router.route("/editExpertByAdmin/:id").put(isAdmin.isAdmin,AdminController.editExpertByAdmin);
  router
  .route("/deleteExpertByAdmin/:_id")
  .delete(isAdmin.isAdmin,AdminController.deleteExpertByAdmin);
  router.route("/getPracticeAreaDetails/:id").get(isAdmin.isAdmin,categorieController.getPracticeAreaDetails);
  router.route("/getCategoryDetails/:id").get(isAdmin.isAdmin,categorieController.getCategoryDetails);
  router.route("/getBorhanUsers").post(isAdmin.isAdmin,AdminController.showBorhanUsers);
  
module.exports = router;
