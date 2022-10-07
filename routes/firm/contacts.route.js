const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const contactsController = require("../../controllers/firm/Contacts.Controller");

router.route("/").get(isFirmAdmin, contactsController.index);
router.route("/").post(isFirmAdmin, contactsController.create);
router.route("/:id").get(isFirmAdmin, contactsController.view);
router.route("/:id").patch(isFirmAdmin, contactsController.update);

router.route("/cases/:id").get(isFirmAdmin, contactsController.cases);

module.exports = router;
