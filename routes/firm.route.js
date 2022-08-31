const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const { addFirm, getAllFirms, getFirmById, editFirm } = require("../controllers/Firm.Controllers");

router
    .route("/addFirm")
    .post(isAdmin.isAdmin, addFirm);

router
    .route("/getAllFirms")
    .get(isAdmin.isAdmin, getAllFirms);

router
    .route("/getFirmById")
    .get(isAdmin.isAdmin, getFirmById);

router
    .route("/editFirm")
    .post(isAdmin.isAdmin, editFirm);

module.exports = router;