const express = require("express");
const router = express.Router();
const categorieController = require("../controllers/admin.controller");
router.route("/addCategories").post(categorieController.addCategories);
router.route("/editCategories/:id").post(categorieController.editCategories);
router.route("/getCategoriesData").get(categorieController.getCategoriesData);
router
  .route("/deleteCategories/:id")
  .post(categorieController.deleteCategoriesData);
router
  .route("/createPracticeArea")
  .post(categorieController.createPracticeArea);

module.exports = router;
