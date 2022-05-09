const express = require("express");
const router = express.Router();
const appCreation = require("../controllers/App.Controller");
const {checkAuth} = require("../middleware/authuser");
const Upload = require("../controllers/Upload");
router.route("/createBorhanUser").post(appCreation.createBorhanUser);
router.route("/userLoginOtp").post(appCreation.userLoginOtp);
router.route("/getDesktopPage").get(checkAuth,appCreation.desktopPage);
router.route("/getUserProfile").get(checkAuth, appCreation.getUserDetails);
router.route("/getAllUpcomingAppointments").get(checkAuth, appCreation.getAllUpcomingAppointments);
router.route("/getAllExpertData").get(checkAuth, appCreation.getAllExpertData);
router
  .route("/getActiveExportData")
  .get(checkAuth, appCreation.getActiveExportData);

  router
  .route("/logoutUser")
  .get(checkAuth, appCreation.logoutUser);
  router.route("/getAllOnlinePremiumExpertsData").get(checkAuth, appCreation.getAllOnlinePremiumExpertsData);



module.exports = router;
