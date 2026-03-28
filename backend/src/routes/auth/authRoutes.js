const express = require("express");
const router = express.Router();

const { register } = require("../../controllers/auth/authController")
const { login } = require("../../controllers/auth/authController")

router.post("/register", register);
router.post("/login", login);

module.exports = router;