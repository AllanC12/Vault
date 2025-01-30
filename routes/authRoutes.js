const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

const { login, register, registerUser } = AuthController;

router.get("/login", login);
router.get("/register", register);
router.post("/register", registerUser);

module.exports = router;
