const express = require("express");
const router = express.Router();
const appCreation = require("../controllers/App.Controller");
const {checkAuth} = require("../middleware/authuser");
const Upload = require("../controllers/Upload");
router.route("/createBorhanUser").post(appCreation.createBorhanUser);
router.route("/userLoginOtp").post(appCreation.userLoginOtp);
router.route("/getDesktopPage").get(checkAuth,appCreation.desktopPage);
router.route("/getUserProfile").get(checkAuth, appCreation.getUserDetails);
router.route("/getAllUpcomingAppointments").post(checkAuth, appCreation.getAllUpcomingAppointments);
router.route("/getAllExpertData").post(checkAuth, appCreation.getAllExpertData);
router
  .route("/getActiveExportData")
  .post(checkAuth, appCreation.getActiveExportData);

  router
  .route("/logoutUser")
  .get(checkAuth, appCreation.logoutUser);
  router.route("/getAllOnlinePremiumExpertsData").post(checkAuth, appCreation.getAllOnlinePremiumExpertsData);
  router.route("/getAllFilteredExperts").post(checkAuth,appCreation.getFilteredExperts);
router
  .route("/updateProfileUser")
  .post(checkAuth, appCreation.updateProfileUser);
router
  .route("/getAppointmentDetail")
  .post(checkAuth, appCreation.getAppointmentDetails);

  



module.exports = router;
