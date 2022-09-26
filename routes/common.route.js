const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const CommonController = require("../controllers/Common.Controller");

router.route("/countries").get(isLoggedIn, CommonController.countries);
router.route("/states").get(isLoggedIn, CommonController.states);
router.route("/cities").get(isLoggedIn, CommonController.cities);

router.route("/contact-types").get(isLoggedIn, CommonController.contactTypes);
router.route("/office-types").get(isLoggedIn, CommonController.officeTypes);
router.route("/court-types").get(isLoggedIn, CommonController.courtTypes);
router.route("/case-billing-methods").get(isLoggedIn, CommonController.caseBillingMethods);

module.exports = router;
