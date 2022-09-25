const express = require("express");
const router = express.Router();
const middleware = require("../helpers/middleware");
const AuthController = require("../controllers/AuthController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;
