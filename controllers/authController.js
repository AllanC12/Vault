const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = class AuthController {
  static async login(req, res) {
    res.render("auth/login");
  }

  static async register(req, res) {
    res.render("auth/register");
  }

  static async registerUser(req, res) {
    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
      req.flash("message", "As senhas não conferem!");
      res.render("auth/register");
      return;
    }

    const checkIfEmailExists = await User.findOne({ where: { email: email } });
    if (checkIfEmailExists) {
      req.flash("message", "O email já está sendo utilizado!");
      res.render("auth/register");
      return;
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      await User.create(newUser);
      req.session.userId = newUser.userId;

      req.session.save(() => {
        res.redirect("/vault/home");
      });
    } catch (error) {
      console.error(error);
    }
  }
};
