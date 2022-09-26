const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const PracticeAreasController = require("../../controllers/firm/PracticeAreas.Controller");

router.route("/").get(isFirmAdmin, PracticeAreasController.index);
router.route("/").post(isFirmAdmin, PracticeAreasController.create);
router.route("/:id").get(isFirmAdmin, PracticeAreasController.view);
router.route("/:id").patch(isFirmAdmin, PracticeAreasController.update);

module.exports = router;
