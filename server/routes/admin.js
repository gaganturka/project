const express = require("express");
const router = express.Router();
const isAdmin=require("../middleware/isAdmin")
const categorieController = require("../controllers/CategoriesAndPracticeArea");
router.route("/addCategories").post(isAdmin.isAdmin,categorieController.addCategories);
router.route("/editCategories/:id").post(categorieController.editCategories);
router.route("/getCategoriesData").get(categorieController.getCategoriesData);
router
  .route("/deleteCategories/:id")
  .post(categorieController.deleteCategoriesData);
router
  .route("/createPracticeArea")
  .post(isAdmin.isAdmin,categorieController.createPracticeArea);
  
router.route("/getPracticeAreaData").get(categorieController.getPracticeAreaData);

module.exports = router;
