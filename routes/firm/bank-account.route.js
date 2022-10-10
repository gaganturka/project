const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const BankAccountController = require("../../controllers/firm/BankAccount.Controller");

router.route("/").get(isFirmAdmin, BankAccountController.index);
router.route("/").post(isFirmAdmin, BankAccountController.create);
router.route("/:id").get(isFirmAdmin, BankAccountController.view);
router.route("/:id").patch(isFirmAdmin, BankAccountController.update);

module.exports = router;