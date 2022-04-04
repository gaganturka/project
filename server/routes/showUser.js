const express = require("express");
const router = express.Router();
const showUser=require('../controllers/ShowUser')
const isAdmin=require("../middleware/isAdmin")

router.route("/getExperts").get(isAdmin.isAdmin,showUser.showExperts);


module.exports = router;
