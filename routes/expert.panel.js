const express = require("express");
const router = express.Router();
const isexpert = require("../middleware/isexpert");
const ExpertController = require("../controllers/ExpertPanel.Controllers");

router.route("/sendOtpExpertUser").post(ExpertController.sendOtpExpertUser);
router.route("/exportLogin").post(ExpertController.exportLogin);

router.route("/getExpertUser").get(isexpert.isExpert,ExpertController.getExpertUser);
router.route("/getExportUserDetail").get(isexpert.isExpert,ExpertController.getExportUserDetail);
router.route("/updateExpertUser").post(isexpert.isExpert,ExpertController.updateExpertUser);
router.route("/getExpertUserInfo").get(isexpert.isExpert,ExpertController.getExpertUserInfoUsingUserModel);
router.route("/getExpertAppointment").post(isexpert.isExpert,ExpertController.getExpertAppointment);
router.route("/updateAppointment").post(isexpert.isExpert,ExpertController.updateAppointment);
router.route("/setAvailableByExpert").post(isexpert.isExpert,ExpertController.setAvailableByExpert);
router.route("/getChatAppointment").get(isexpert.isExpert,ExpertController.getChatAppointment);
router.route("/getChatAppointmentById").get(ExpertController.getChatAppointmentById);
router.route("/updateChatAppointment").post(isexpert.isExpert,ExpertController.updateChatAppointment);
router.route("/setExpertStatus").post(isexpert.isExpert,ExpertController.setExpertStatus);
router.route("/getExpertAppointmentByFilter").post(isexpert.isExpert,ExpertController.getExpertAppointmentByFilter);

router.route("/videoChatTokenExpert").post(isexpert.isExpert,ExpertController.twilioVideoChatTokenExpert);
router.route("/sendPushNotificationChatRequest").post(isexpert.isExpert,ExpertController.sendPushNotificationChatRequest);
router.route("/twilioVoiceCallExpert").post(isexpert.isExpert,ExpertController.twlioVoiceCallExpert);

router.route("/getSingleAppointment").post(ExpertController.getSingleAppointment);
router.route("/twilioVideoMarkComplete").post(isexpert.isExpert,ExpertController.twilioVideoMarkComplete);
router.route("/twilioAudioMarkComplete").post(isexpert.isExpert,ExpertController.twilioAudioMarkComplete);

router.route("/timeSlotsOfUserSingleDay").get(isexpert.isExpert, ExpertController.timeSlotsOfUserSingleDay);
router.route("/cancelAppointmentByExpert").post(isexpert.isExpert, ExpertController.cancelAppointmentByExpert);
router.route("/deleteTimeSlot").post(isexpert.isExpert, ExpertController.deleteTimeSlot);



module.exports = router;
