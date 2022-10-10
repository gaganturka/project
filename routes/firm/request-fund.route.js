const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const RequestFundController = require("../../controllers/firm/RequestFund.Controller");

router.route("/").get(isFirmAdmin, RequestFundController.index);
router.route("/").post(isFirmAdmin, RequestFundController.create);
router.route("/:id").get(isFirmAdmin, RequestFundController.view);
router.route("/:id").patch(isFirmAdmin, RequestFundController.update);

module.exports = router;