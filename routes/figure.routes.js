const express = require('express');
const router = express.Router();
const figures = require("../controllers/figure.controller.js");
const multer = require('../middlewares/multer.config.js');

router.post("/", multer, figures.create);

module.exports = router;