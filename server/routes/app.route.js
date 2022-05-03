const express = require("express");
const router = express.Router();
const appCreation = require("../controllers/App.Controller");
const {checkAuth} = require("../middleware/authuser");
const Upload = require("../controllers/Upload");
router.route("/createBorhanUser").post(appCreation.createBorhanUser);
router.route("/userLogin").post(appCreation.userLogin);
router.route("/getDesktopPage").get(checkAuth,appCreation.desktopPage);

module.exports = router;
