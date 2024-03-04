const express = require('express');
const router = express.Router();
const todos = require("../controllers/todo.controller.js");

router.post("/", todos.create);
router.get("/", todos.findAll);

module.exports = router;