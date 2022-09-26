const express = require("express");
const router = express.Router();
const isFirmAdmin = require("../../middleware/isFirmAdmin");
const EmployeeRolesController = require("../../controllers/firm/EmployeeRoles.Controller");

router.route("/").get(isFirmAdmin, EmployeeRolesController.index);
router.route("/").post(isFirmAdmin, EmployeeRolesController.create);
router.route("/:id").get(isFirmAdmin, EmployeeRolesController.view);
router.route("/:id").patch(isFirmAdmin, EmployeeRolesController.update);

module.exports = router;
