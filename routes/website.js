const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const authUser = require("../middleware/authuser");
const authUser2 = require("../middleware/authuser2");

const WebsiteController = require("../controllers/WebsitePanel.Controller");
const BorhanController = require("../controllers/BorhanUser.Admin");
const AppController = require("../controllers/App.Controller");
const AdminController = require("../controllers/Expert.Admin");
const ExpertController = require("../controllers/ExpertPanel.Controllers");
// router
//   .route("/getBorhanUsers")
//   .post(isAdmin.isAdmin, BorhanController.showBorhanUsers);
// router
//   .route("/deleteBorhanUserByAdmin/:_id")
//   .delete(isAdmin.isAdmin, BorhanController.deleteBorhanUserByAdmin);
// router
//   .route("/getUserDetails")
//   .post(isAdmin.isAdmin, BorhanController.getUserDetails);
router.route("/getOnlineExperts").get(WebsiteController.showOnlineExperts);
router
  .route("/getBorhanUserDetails")
  .get(authUser.checkAuth, WebsiteController.showBorhanUserDetails);
router
  .route("/editBorhanUserDetails")
  .put(authUser.checkAuth, WebsiteController.editBorhanUserDetails);
router
  .route("/getFilteredOnlineExperts")
  .post(authUser2.checkAuth2, WebsiteController.getFilteredOnlineExperts);
router
  .route("/getPracticeAreaDataSearched")
  .post(WebsiteController.getPracticeAreaDataSearched);
router
  .route("/getFilteredOnlinePremiumExperts")
  .post(
    authUser2.checkAuth2,
    WebsiteController.getFilteredOnlinePremiumExperts
  );
router
  .route("/getOnlinePremiumExperts")
  .get(WebsiteController.getOnlinePremiumExperts);
router.route("/getSingleExpert").get(WebsiteController.getSingleExpert);
router
  .route("/bookAppointment")
  .post(authUser.checkAuth, WebsiteController.bookAppointment);
router
  .route("/bookChatAppointment")
  .post(authUser.checkAuth, WebsiteController.bookChatAppointment);
router.route("/getQuesAndAns").get(BorhanController.getQuesAndAns);
router.route("/getTopExperts").get(WebsiteController.getTopExperts);
router.route("/getTestimonies").get(WebsiteController.getTestimonies);
router.route("/createTestimony").post(WebsiteController.createTestimony);
router
  .route("/subscribeNewsletter")
  .post(WebsiteController.subscribeNewsletter);
router
  .route("/getAvailableTimeForUser")
  .get(WebsiteController.getAvailableTimeForUser);
router
  .route("/getAppointments")
  .post(authUser.checkAuth, WebsiteController.getAppointments);
router
  .route("/cancelAppointment/:id")
  .delete(authUser.checkAuth, WebsiteController.cancelAppointment);
router
  .route("/rescheduleAnAppointment")
  .post(authUser.checkAuth, WebsiteController.rescheduleAppointment);
router
  .route("/videoChatTokenUser")
  .post(authUser.checkAuth, WebsiteController.twilioVideoChatTokenUser);

router
  .route("/getChatAppointment")
  .get(authUser.checkAuth, WebsiteController.getChatAppointment);
router
  .route("/getFavExpert")
  .get(authUser.checkAuth, WebsiteController.getFavExpert);
router
  .route("/setFavExpert")
  .post(authUser.checkAuth, WebsiteController.setFavExpert);
router
  .route("/getUsersFavoriteExperts")
  .get(authUser.checkAuth, WebsiteController.getUsersFavoriteExperts);
router
  .route("/twlioVoiceCallUser")
  .post(authUser.checkAuth, WebsiteController.twlioVoiceCallUser);
router
  .route("/twilioVoiceResponse")
  .post(WebsiteController.twilioVoiceResponse);
router
  .route("/twilioVideoCallback")
  .post(WebsiteController.twilioVideoCallback);

router
  .route("/isExpertRated")
  .post(authUser.checkAuth, WebsiteController.CheckExpertIsAlreadyRated);
router.route("/addUserRequest").post(AppController.addUserRequest);
router.route("/sendNotificaton").post(
  // authUser.checkAuth,
  WebsiteController.sendNotificaton
);
router.route("/getNewsLetter").get(
  // authUser.checkAuth,
  WebsiteController.getNewsLetter
);
// website payment gateway routes started
router.route("/createSession").post(AppController.createSession);
router
  .route("/getAllSubscriptionTypes")
  .get(AdminController.getSubscriptionTypeByAdmin);

router
  .route("/addUserSubscription")
  .post(authUser.checkAuth, WebsiteController.addUserSubscription);

router
  .route("/updateUserSubscription")
  .post(authUser.checkAuth, WebsiteController.updateUserSubscription);

router
  .route("/getExpertPriceDetails")
  .get(authUser.checkAuth, ExpertController.getExpertPriceDetails);
router
  .route("/getExpertPricingDetailsAccordingToCallType")
  .post(
    authUser.checkAuth,
    WebsiteController.getExpertPricingDetailsAccordingToCallType
  );
router
  .route("/getAmountCharged")
  .post(authUser.checkAuth, WebsiteController.getAmountCharged);

router
  .route("/amountToPayForAppointmentBooking")
  .post(authUser.checkAuth, WebsiteController.amountToPayForAppointmentBooking);

router
  .route("/addUserOneTimePayment")
  .post(authUser.checkAuth, WebsiteController.addUserOneTimePayment);

router
  .route("/updateUserOneTimePayment")
  .post(authUser.checkAuth, WebsiteController.updateUserOneTimePayment);

router
  .route("/getUserWalletDetails")
  .get(authUser.checkAuth, WebsiteController.getUserTransactionDetails);

router
  .route("/getUserPaymentMethodDetails")
  .get(authUser.checkAuth, WebsiteController.getUserPaymentMethodDetails);
router
  .route("/getUserAllActivePlans")
  .get(authUser.checkAuth, WebsiteController.getUserAllActivePlans);

module.exports = router;
