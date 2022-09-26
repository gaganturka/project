const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const contactGroupsController = require("../../controllers/firm/ContactGroups.Controller");

router.route("/").get(isFirmAdmin, contactGroupsController.index);
router.route("/").post(isFirmAdmin, contactGroupsController.create);
router.route("/:id").get(isFirmAdmin, contactGroupsController.view);
router.route("/:id").patch(isFirmAdmin, contactGroupsController.update);

module.exports = router;
