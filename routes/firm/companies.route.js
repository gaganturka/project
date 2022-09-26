const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const companiesController = require("../../controllers/firm/Companies.Controller");

router.route("/").get(isFirmAdmin, companiesController.index);
router.route("/").post(isFirmAdmin, companiesController.create);
router.route("/:id").get(isFirmAdmin, companiesController.view);
router.route("/:id").patch(isFirmAdmin, companiesController.update);

module.exports = router;
