const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/homeController");

const {
  home,
  editBalance,
  registerExpenseRevenue,
  deleteRevenue,
  deleteExpense,
} = HomeController;

router.post("/editBalance", editBalance);
router.post("/deleteExpense", deleteExpense);
router.post("/registerExpenseRevenue", registerExpenseRevenue);
router.post("/deleteRevenue", deleteRevenue);
router.get("/", home);

module.exports = router;
