const bcryptjs = require("bcryptjs");

const Accounts = require("../models/Accounts");
const User = require("../models/User");
const Revenues = require("../models/Revenues");
const Expenses = require("../models/Expenses");
module.exports = class HomeController {
  static async home(req, res) {
    const idUser = req.session.userid;
    const [revenues, expenses] = await HomeController.getAllRevenuesExpenses(
      idUser
    );

    res.render("home/home", { revenues, expenses });

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

  static async getAllRevenuesExpenses(userId) {
    const revenues = await Revenues.findAll({
      where: { UserId: userId },
      raw: true,
    });
    const expenses = await Expenses.findAll({
      where: { UserId: userId },
      raw: true,
    });

    return [revenues, expenses];
  }

  static async registerExpenseRevenue(req, res) {
    const { description, choices, value } = req.body;
    const idUser = req.session.userid;
    const registerToUpdate = {
      value,
      description,
      UserId: idUser,
    };

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

    const [revenues, expenses] = await HomeController.getAllRevenuesExpenses(
      idUser
    );

    res.render("home/home", { revenues, expenses });
  }

  static async deleteRevenue(req,res){
    const {id} = req.body;
    console.log(id);
    const idUser = req.session.userid;
    await Revenues.destroy({where: {id}});
    const [revenues, expenses] = await HomeController.getAllRevenuesExpenses(idUser);
    res.render("home/home", { revenues, expenses });
  }

  static async deleteExpense(req,res){
    const {id} = req.body;
    const idUser = req.session.userid;
    await Expenses.destroy({where: {id}});
    const [revenues, expenses] = await HomeController.getAllRevenuesExpenses(idUser);
    res.render("home/home", { revenues, expenses });
  }
};
