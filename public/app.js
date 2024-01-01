document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("expenseForm");
  const expensesList = document.getElementById("expensesList");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  // Function to add an expense
  window.addExpense = async () => {
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;

    if (!description || !amount) {
      alert("Please fill in both description and amount.");
      return;
    }

    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description, amount }),
      });

      const newExpense = await response.json();
      displayExpense(newExpense);
      form.reset();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Function to display expenses
  const displayExpense = (expense) => {
    const expenseDiv = document.createElement("div");
    expenseDiv.classList.add("expense");
    expenseDiv.innerHTML = `<span>${expense.description}:</span> ₹${expense.amount}`;

    expensesList.appendChild(expenseDiv);
  };

  // Fetch and display existing expenses
  try {
    const response = await fetch("/api/expenses");
    const expenses = await response.json();
    expenses.forEach(displayExpense);
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
});
