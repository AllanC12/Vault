const bcryptjs = require("bcryptjs");

const Accounts = require("../models/Accounts");
const User = require("../models/User");
module.exports = class HomeController {
  static async home(req, res) {
    res.render("home/home");
  }

  static async editBalance(req, res) {
    const { balance, password } = req.body;
    const idUser = req.session.userid;

    const user = await User.findOne({ where: { id: idUser } });

    const passwordMatch = bcryptjs.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash("message", "Senha incorreta");
      res.redirect("/vault/home");
      return;
    }

    try {
      const account = {
        expenses: 0,
        revenues: 0,
        balance,
      };
      console.log(account);
      await Accounts.create(account);
    } catch (error) {
      console.log(error);
    }

    res.render("home/home", { balance });
  }
};
