const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const ExpertController = require("../controllers/ExpertPanel.Controllers");

router.route("/sendOtpExpertUser").post(ExpertController.sendOtpExpertUser);
router.route("/exportLogin").post(ExpertController.exportLogin);

router.route("/getExpertUser").get(ExpertController.getExpertUser);
router.route("/getExportUserDetail").get(ExpertController.getExportUserDetail);
router.route("/updateExpertUser").post( ExpertController.updateExpertUser);

module.exports = router;
