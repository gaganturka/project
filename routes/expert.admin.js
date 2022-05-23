const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const ExpertController = require("../controllers/Expert.Admin");

router
  .route("/getExpertApprovedByAdmin/:_id")
  .get(isAdmin.isAdmin, ExpertController.getExpertApprovedByAdmin);
router
  .route("/getExpertRejectedByAdmin/:_id")
  .get(isAdmin.isAdmin, ExpertController.getExpertRejectedByAdmin);
router.route("/getExperts").post(isAdmin.isAdmin, ExpertController.showExperts);
router
  .route("/getExpertsAccountTypeExpert")
  .post(isAdmin.isAdmin, ExpertController.showExpertsAccountTypeExpert);
router
  .route("/getExpertsAccountTypeFreelancer")
  .post(isAdmin.isAdmin, ExpertController.showExpertsAccountTypeFreelancer);

router
  .route("/getExpertsRequests")
  .post(isAdmin.isAdmin, ExpertController.showExpertsRequests);
router
  .route("/getExpertDetails/:id")
  .get(isAdmin.isAdmin, ExpertController.showExpertDetails);
router
  .route("/editExpertByAdmin/:id")
  .put(isAdmin.isAdmin, ExpertController.editExpertByAdmin);
router
  .route("/deleteExpertByAdmin/:_id")
  .delete(isAdmin.isAdmin, ExpertController.deleteExpertByAdmin);
  
  router
  .route("/getAdminDetails")
  .get(isAdmin.isAdmin, ExpertController.getAdminDetails);

module.exports = router;
