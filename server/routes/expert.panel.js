const express = require("express");
const router = express.Router();
const isexpert = require("../middleware/isexpert");
const ExpertController = require("../controllers/ExpertPanel.Controllers");

router.route("/sendOtpExpertUser").post(ExpertController.sendOtpExpertUser);
router.route("/exportLogin").post(ExpertController.exportLogin);

router.route("/getExpertUser").get(isexpert.isExpert,ExpertController.getExpertUser);
router.route("/getExportUserDetail").get(isexpert.isExpert,ExpertController.getExportUserDetail);
router.route("/updateExpertUser").post( ExpertController.updateExpertUser);
router.route("/getExpertUserInfo").get(isexpert.isExpert,ExpertController.getExpertUserInfoUsingUserModel);
router.route("/getExpertAppointment").get(isexpert.isExpert,ExpertController.getExpertAppointment);

module.exports = router;
