const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/homeController");

const { home, editBalance } = HomeController;

router.post("/editBalance", editBalance);
router.get("/", home);

module.exports = router;
