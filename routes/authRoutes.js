const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

const { login, loginPost, register, registerUser } = AuthController;

router.get("/login", login);
router.post("/login", loginPost);
router.get("/register", register);
router.post("/register", registerUser);

module.exports = router;
