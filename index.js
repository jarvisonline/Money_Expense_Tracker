const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const username = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.m9rcgwt.mongodb.net/expenses  `
);

// Define MongoDB schema and model (e.g., Expense)
const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", expenseSchema);

app.use(express.static("public"));

// API endpoint to get all expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to add a new expense
app.post("/api/expenses", async (req, res) => {
  const { description, amount } = req.body;

  try {
    const newExpense = new Expense({ description, amount });
    await newExpense.save();
    res.json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
