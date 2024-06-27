const express = require("express");
const getHome =require("../controller/tasks.js");

const router = express.Router();

router.get("/", getHome);

module.exports = router;