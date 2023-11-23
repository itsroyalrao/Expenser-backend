import Auth from "../models/auth.js";
import Expense from "../models/expense.js";

const findUser = async (req, res) => {
  try {
    const user = await Auth.findOne({ email: req.query.user });

    if (user)
      return res.json({
        success: true,
        user: {
          username: user.username,
          email: user.email,
          loggedIn: user.loggedIn,
        },
      });
    else return res.json({ success: false });
  } catch (e) {
    console.log(e);
  }
};

const addExpense = async (req, res) => {
  try {
    const { expenseType, amount, description, email } = req.body;
    const expense = await Expense.findOne({ email }).sort({
      _id: -1,
    });

    if (expense) {
      console.log("if part");
      const totalAmount = Number(amount) + expense.totalAmount;
      const result = await Expense.create({
        email,
        expenseType,
        amount,
        description,
        totalAmount,
      });
      return res.json({ success: true, result });
    } else {
      console.log("else part");
      const result = await Expense.create({
        email,
        expenseType,
        amount,
        description,
        totalAmount: amount,
      });
      return res.json({ success: true, result });
    }
  } catch (e) {
    console.log(e);
  }
};

const totalExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ email: req.query.email }).sort({
      _id: -1,
    });
    res.json({ success: true, expense });
  } catch (e) {
    console.log(e);
  }
};

export { findUser, addExpense, totalExpense };
