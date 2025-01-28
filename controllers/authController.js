const User = require("../models/User");

module.exports = class AuthController {
  static async login(req, res) {
    res.render("auth/login");
  }

  static async register(req, res) {
    res.render("auth/register");
  }

  static async registerUser(req, res) {
    const newUser = {
      name: req.body.name,
      user: req.body.user,
      password: req.body.password,
    };

    res.redirect("/vault/login");
  }
};
