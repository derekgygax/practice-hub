# Design a simple banking system. It needs

# -Bank
# -Create account
#   -If already there error out
# -Deposit to account (including adding and removing)
#   -If not enough funds then error out
# -Transfer from one account to another (remember to block if not enough money)
#   -If account doesn't exist error out
#   -If not enough funds error out
# -Find n acounts with the most transaction amount (negative and positive are both transaction amounts)
#   -Order by highest transactions first, if they are the same amount then order alphabetically
# -Format of string printed out for the accounts with the highest transaction amount:  USE __repr__
#     Account name (transaction amount)

# All the transactions need to be able to run. As in one input can have an error and stop and then the next one runs.

# inputs
# -CREATE_ACCOUNT, account_name
# -DEPOSIT, account_name, amount
# -WITHDRAW, account_name, amount
# -TRANSFER, source_account, destination_account, amount
# -TOP_TRANSACTIONS, count


inputs = [
    ["CREATE_ACCOUNT", "acc1"],
    ["DEPOSIT", "acc1", 500],
    ["CREATE_ACCOUNT", "acc2"],
    ["DEPOSIT", "acc2", 200],
    ["TRANSFER", "acc1", "acc2", 100],
    ["TRANSFER", "acc1", "acc3", 600],  # Error: destination account does not exist
    ["CREATE_ACCOUNT", "acc3"],
    ["DEPOSIT", "acc3", 700],
    ["TRANSFER", "acc3", "acc1", 800],  # Error: not enough funds
    ["WITHDRAW", "acc1", 100],  # Withdraw funds from acc1
    ["WITHDRAW", "acc2", 50],   # Withdraw funds from acc2
    ["TRANSFER", "acc1", "acc2", 300],
    ["TRANSFER", "acc2", "acc1", 150],
    ["CREATE_ACCOUNT", "acc4"],
    ["DEPOSIT", "acc4", 400],
    ["TRANSFER", "acc3", "acc4", 100],
    ["TRANSFER", "acc4", "acc3", 50],
    ["TOP_TRANSACTIONS", 5],
    ["CREATE_ACCOUNT", "acc5"],
    ["DEPOSIT", "acc5", 1000],
    ["TRANSFER", "acc5", "acc4", 500],
    ["TRANSFER", "acc4", "acc5", 250],
    ["WITHDRAW", "acc4", 150],  # Withdraw funds from acc4
    ["CREATE_ACCOUNT", "acc6"],
    ["DEPOSIT", "acc6", 50],
    ["TRANSFER", "acc6", "acc5", 100],  # Error: not enough funds
    ["DEPOSIT", "acc6", 200],
    ["TRANSFER", "acc6", "acc5", 250],  # Error: not enough funds
    ["TRANSFER", "acc5", "acc6", 300],
    ["TOP_TRANSACTIONS", 3],
    ["CREATE_ACCOUNT", "acc7"],
    ["DEPOSIT", "acc7", 100],
    ["TRANSFER", "acc7", "acc6", 50],
    ["WITHDRAW", "acc7", 20],   # Withdraw funds from acc7
    ["TRANSFER", "acc7", "acc1", 50],
    ["CREATE_ACCOUNT", "acc8"],
    ["TRANSFER", "acc7", "acc8", 30],
    ["TRANSFER", "acc8", "acc7", 10],
    ["TRANSFER", "acc8", "acc7", 50],   # Error: not enough funds
    ["TOP_TRANSACTIONS", 10],
    ["CREATE_ACCOUNT", "acc9"],
    ["TRANSFER", "acc8", "acc9", 50],
    ["TRANSFER", "acc9", "acc8", 25],
    ["CREATE_ACCOUNT", "acc10"],
    ["DEPOSIT", "acc10", 600],
    ["TRANSFER", "acc10", "acc9", 300],
    ["TRANSFER", "acc9", "acc10", 50],
    ["TOP_TRANSACTIONS", 15],
    ["DEPOSIT", "acc11", 100],  # Error: account does not exist
    ["CREATE_ACCOUNT", "acc11"],
    ["DEPOSIT", "acc11", 300],
    ["TRANSFER", "acc11", "acc10", 100],
    ["CREATE_ACCOUNT", "acc12"],
    ["DEPOSIT", "acc12", 400],
    ["TRANSFER", "acc12", "acc11", 200],
    ["TRANSFER", "acc11", "acc12", 50],
    ["TOP_TRANSACTIONS", 3]
]
