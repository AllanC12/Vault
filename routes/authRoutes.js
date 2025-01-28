const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const { login, register, registerUser } = authController;

router.get("/login", login);
router.get("/register", register);
router.post("/register", registerUser);

module.exports = router;
