const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/homeController");

const { home } = HomeController;

router.get("/", home);

module.exports = router;
