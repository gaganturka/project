const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const categorieController = require("../controllers/CategoriesAndPracticeArea");

router
  .route("/addCategories")
  .post(isAdmin.isAdmin, categorieController.addCategories);
router
  .route("/editCategories/:id")
  .put(isAdmin.isAdmin, categorieController.editCategories);
router.route("/getCategoriesData").get(categorieController.getCategoriesData);
router
  .route("/deleteCategories/:id")
  .delete(isAdmin.isAdmin, categorieController.deleteCategoriesData);
router.route("/getCategoryDetails").get(categorieController.getCategoryDetails);

router
  .route("/createPracticeArea")
  .post(isAdmin.isAdmin, categorieController.createPracticeArea);
router
  .route("/deletePracticeArea/:id")
  .delete(isAdmin.isAdmin, categorieController.deletePracticeArea);
router
  .route("/editPracticeArea/:id")
  .put(isAdmin.isAdmin, categorieController.editPracticeArea);

router
  .route("/getPracticeAreaData")
  .get(categorieController.getPracticeAreaData);
  router
  .route("/getParticularPracticeAreaCateories")
  .get(categorieController.getParticularPracticeAreaCateories);
  
  router
  .route("/getPracticeAreaCategories/:id")
  .get(categorieController.getPracticeAreaCategories);
  
router
  .route("/getPracticeAreaDataPopulated")
  .get(categorieController.getPracticeAreaDataPopulated);
router
  .route("/getPracticeAreaDetails/:id")
  .get( categorieController.getPracticeAreaDetails);
router
  .route("/getCategoryDetails/:id")
  .get( categorieController.getCategoryDetails);
  router
  .route("/getPracticeAreaDataInGroups")
  .get(categorieController.getPracticeAreaDataInGroups);
  
module.exports = router;
