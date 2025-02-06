const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = class AuthController {
  static async login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      req.flash("message", "Usuário não encontrado!");
      res.render("auth/login");
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash("message", "Senha incorreta!");
      res.render("auth/login");
      return;
    }

    req.session.userid = user.id;
    req.session.save(() => {
      res.redirect("/vault/home");
    });
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
      const createdUser = await User.create(newUser);
      req.session.userid = createdUser.userId;

      req.session.save(() => {
        res.redirect("/home");
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  }
};
