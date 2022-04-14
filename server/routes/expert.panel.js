const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const ExpertController = require("../controllers/ExpertPanel.Controllers");

router.route("/getExpertUser").get( ExpertController.getExpertUser);
router.route("/updateExpertUser").post( ExpertController.updateExpertUser);

module.exports = router;
