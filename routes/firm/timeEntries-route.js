const express = require('express')
const router = express.Router();
const timeEntriesController = require('../../controllers/firm/FirmCaseTimeEntries') 
const isFirmAdmin = require("../../middleware/isFirmAdmin");


router.route("/").post(isFirmAdmin, timeEntriesController.create)
router.route("/").get(timeEntriesController.view)
router.route("/:id").put(timeEntriesController.update)
router.route("/:id").delete(timeEntriesController.deletee)
router.route("/:id").get(isFirmAdmin, timeEntriesController.index)




module.exports = router