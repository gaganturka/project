const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const EmployeesController = require("../../controllers/firm/Employees.Controller");

router.route("/").get(isFirmAdmin, EmployeesController.index);
router.route("/").post(isFirmAdmin, EmployeesController.create);
router.route("/:id").get(isFirmAdmin, EmployeesController.view);
router.route("/:id").patch(isFirmAdmin, EmployeesController.update);

module.exports = router;
