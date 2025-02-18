function summarizeTransactions(transactions) {
  let summary = {};

  transactions.forEach(transaction => {
    let { category, amount } = transaction;

    if (category in summary) {
      summary[category] += amount;
    } else {
      summary[category] = amount;
    }
  });

  return Object.entries(summary).map(([category, total]) => {
    return `Category: ${category}, Total: $${total}`;
  });
}

// Test Cases
const transactions = [
  { category: "Food", amount: 15 },
  { category: "Transport", amount: 10 },
  { category: "Food", amount: 25 },
  { category: "Entertainment", amount: 50 },
  { category: "Transport", amount: 5 }
];

console.log(summarizeTransactions(transactions));
