const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const ActivityTypesController = require("../../controllers/firm/ActivityTypes.Controller");

router.route("/").get(isFirmAdmin, ActivityTypesController.index);
router.route("/").post(isFirmAdmin, ActivityTypesController.create);
router.route("/:id").get(isFirmAdmin, ActivityTypesController.view);
router.route("/:id").patch(isFirmAdmin, ActivityTypesController.update);
router.route("/:id").delete(isFirmAdmin, ActivityTypesController.deleteRecord);

module.exports = router;
