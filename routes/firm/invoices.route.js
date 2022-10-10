const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const invoiceController = require("../../controllers/firm/Invoices.Controller");

router.route("/").get(isFirmAdmin, invoiceController.index);
router.route("/").post(isFirmAdmin, invoiceController.create);
router.route("/:id").get(isFirmAdmin, invoiceController.view);
router.route("/:id").patch(isFirmAdmin, invoiceController.update);
router.route("/:id").delete(isFirmAdmin, invoiceController.deleteRecord);

router.route("/info/invoice-number").get(isFirmAdmin, invoiceController.nextInvoiceNumber);
router.route("/info/stats").get(isFirmAdmin, invoiceController.stats);

module.exports = router;
