const Accounts = require("../models/Accounts");

module.exports = class HomeController {
  static async home(req, res) {
    res.render("home/home");
  }
};
