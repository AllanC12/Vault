const Accounts = require("../models/Accounts");

module.exports = class HomeController {
  static async home(req, res) {
    res.render("home/home");
  }

  static async editBalance(req, res) {
    console.log("teste");

    res.render("home/home");
  }
};
