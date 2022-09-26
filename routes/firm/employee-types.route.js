const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const EmployeeTypesController = require("../../controllers/firm/EmployeeTypes.Controller");

router.route("/").get(isFirmAdmin, EmployeeTypesController.index);
router.route("/").post(isFirmAdmin, EmployeeTypesController.create);
router.route("/:id").get(isFirmAdmin, EmployeeTypesController.view);
router.route("/:id").patch(isFirmAdmin, EmployeeTypesController.update);

module.exports = router;
