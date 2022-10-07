const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const casesController = require("../../controllers/firm/Cases.Controller");

router.route("/").get(isFirmAdmin, casesController.index);
router.route("/").post(isFirmAdmin, casesController.create);
router.route("/:id").get(isFirmAdmin, casesController.view);
router.route("/:id").patch(isFirmAdmin, casesController.update);

router.route("/case-employees/:id").get(isFirmAdmin, casesController.caseEmployees);
router.route("/invoice-items/:id").get(isFirmAdmin, casesController.invoiceAbleItems);

module.exports = router;
