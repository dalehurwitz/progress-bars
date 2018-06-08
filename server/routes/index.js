const express = require("express");
const { generateBars } = require("../controllers");
const router = express.Router();

router.get("/bars", generateBars);

module.exports = router;
