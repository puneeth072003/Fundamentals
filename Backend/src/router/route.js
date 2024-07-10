const express = require("express");
const getHome =require("../controller/tasks.js");
const { login, signin, getCurrentUser } = require("../controller/db.js");

const router = express.Router();

router.get("/", getHome);
router.get("/login",login);
router.get("/signin",signin);
router.get('/getuser',getCurrentUser);

module.exports = router;