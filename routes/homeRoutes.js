const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/homeController");

const { home, editBalance, registerExpenseRevenue } = HomeController;

router.post("/editBalance", editBalance);
router.post("/registerExpenseRevenue", registerExpenseRevenue);
router.get("/", home);

module.exports = router;
