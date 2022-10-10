const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const LocationController = require("../../controllers/firm/Location.Controller");

router.route("/").get(isFirmAdmin, LocationController.index);
router.route("/").post(isFirmAdmin, LocationController.create);
router.route("/:id").get(isFirmAdmin, LocationController.view);
router.route("/:id").patch(isFirmAdmin, LocationController.update);

module.exports = router;