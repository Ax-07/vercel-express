const express = require('express');
const router = express.Router();
const figures = require("../controllers/figure.controller.js");

router.post("/", figures.create);
router.get("/", figures.findAll);

module.exports = router;