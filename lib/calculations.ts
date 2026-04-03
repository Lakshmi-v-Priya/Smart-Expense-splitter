export function calculateBalances(expenses: any[]) {
  const balances: Record<string, number> = {};

  expenses.forEach((expense) => {
    const splitAmount = expense.amount / expense.splitBetween.length;

    if (!balances[expense.paidBy]) balances[expense.paidBy] = 0;
    balances[expense.paidBy] += expense.amount;

    expense.splitBetween.forEach((member: string) => {
      if (!balances[member]) balances[member] = 0;
      balances[member] -= splitAmount;
    });
  });

  return balances;
}