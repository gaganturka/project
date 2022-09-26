const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const isFirmAdmin = require("../middleware/isFirmAdmin");
const {
    addFirm,
    getAllFirms,
    getFirmById,
    editFirm,
    loginFirm,
    addContactGroup,
    addCaseStages,
    getContactGroups,
    getCaseStages,
    getContactGroupById,
    editContactGroup,
    getCaseStageById,
    editCaseStage,
    addRole,
    getRoles,
    getRoleById,
    editRole,
    getSelectOptions,
    getRolesOptions,
    getEmployeeTypes,
    addEmployee
} = require("../controllers/Firm.Controllers");

router
    .route("/addFirm")
    .post(isAdmin.isAdmin, addFirm);

router
    .route("/getAllFirms")
    .get(isAdmin.isAdmin, getAllFirms);

router
    .route("/getFirmById/:firmId")
    .get(isAdmin.isAdmin, getFirmById);

router
    .route("/editFirm")
    .post(isAdmin.isAdmin, editFirm);

router
    .route("/loginFirm")
    .post(loginFirm);

router
    .route("/addContactGroup")
    .post(isFirmAdmin, addContactGroup);

router
    .route("/getContactGroupId/:contactGroupId")
    .get(isFirmAdmin, getContactGroupById);

router
    .route("/editContactGroup")
    .post(isFirmAdmin, editContactGroup);

router
    .route("/getContactGroups")
    .post(isFirmAdmin, getContactGroups);

router
    .route("/addCaseStages")
    .post(isFirmAdmin, addCaseStages);

router
    .route("/getCaseStageId/:caseStageId")
    .get(isFirmAdmin, getCaseStageById);

router
    .route("/editCaseStage/:caseStageId")
    .post(isFirmAdmin, editCaseStage);

router
    .route("/getCaseStages")
    .post(isFirmAdmin, getCaseStages);

router
    .route("/getCaseStages")
    .get(isFirmAdmin, getCaseStages);

router.route("/add-role")
    .post(isFirmAdmin, addRole);

router
    .route("/roles")
    .post(isFirmAdmin, getRoles);

router
    .route("/get-role-by-id/:roleId")
    .get(isFirmAdmin, getRoleById);

router
    .route("/edit-role/:roleId")
    .patch(isFirmAdmin, editRole);

router
    .route("/get-select-options")
    .get(isFirmAdmin, getSelectOptions);

router
    .route("/get-roles-options")
    .get(isFirmAdmin, getRolesOptions);

router
    .route("/get-employee-types")
    .get(isFirmAdmin, getEmployeeTypes);

router
    .route("/employees")
    .post(isFirmAdmin, addEmployee);

module.exports = router;
