const bcryptjs = require("bcryptjs");

const Accounts = require("../models/Accounts");
const User = require("../models/User");
const Revenues = require("../models/Revenues");
const Expenses = require("../models/Expenses");
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
      await Accounts.create(account);
    } catch (error) {
      console.log(error);
    }

    if (balance === null) balance = 0;

    res.render("home/home", { balance });
  }

  static async registerExpenseRevenue(req, res) {
    const { description, choices, value } = req.body;
    const idUser = req.session.userid;
    const registerToUpdate = {
      value,
      description,
      UserId: idUser,
    };

    console.log(req.body);

    if (choices === "revenues") {
      try {
        await Revenues.create(registerToUpdate);
      } catch (error) {
        console.log(error);
      }
    } else if (choices === "expenses") {
      try {
        await Expenses.create(registerToUpdate);
      } catch (error) {
        console.log(error);
      }
    }

    res.render("home/home");
  }
};
