import Auth from "../models/auth.js";
import Expense from "../models/expense.js";

const addExpense = async (req, res) => {
  try {
    const { expenseType, amount, description, email } = req.body;
    const expense = await Expense.findOne({ email }).sort({
      _id: -1,
    });

    if (expense) {
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

const allExpenses = async (req, res) => {
  try {
    const expense = await Expense.find({ email: req.query.email }).sort({
      _id: -1,
    });
    res.json({ success: true, expense });
  } catch (e) {
    console.log(e);
  }
};

export { addExpense, allExpenses };
