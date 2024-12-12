export { };

/*

Design a simple banking system. It needs to be able

-Bank
-Create account
  -If already there return -1
-Deposit to account
  -If not enough funds return -1
-Transfer from one account to another (remember to block if not enough money and shit)
  -If account doesn't exist return -1
  -If not enough funds return -1
-Find n acounts with the most transaction amount 
  -Return by amount first and then if they are the same amount alphabetical
  -Return as:
    -AccountName(Transaction Amount)
*/


class Account {

  private name: string;
  private amount: number;
  private transaction: number;

  constructor(name: string) {
    this.name = name;
    this.amount = 0;
    this.transaction = 0;
  }

  // add money to the account
  deposit(amount: number) {
    this.amount += amount;
    this.transaction += amount;
  }

  // remove money from the account
  withdraw(amount: number): boolean {
    // If you want to withdraw more than is in the account then return -1
    if (amount > this.amount) {
      return false;
    }
    this.amount -= amount;
    this.transaction += amount;
    return true;
  }

  getName(): string {
    return this.name;
  }

  getTransaction(): number {
    return this.transaction;
  }

  toString() {
    return `${this.name}(${this.transaction})`;
  }

}

class Bank {
  public accounts: Map<string, Account>;


  constructor() {
    this.accounts = new Map<string, Account>();
  }

  createAccount(name: string): number {
    // If the account already exists return a -1
    if (this.accounts.has(name)) {
      return -1;
    }

    // Create the account and store it 
    const account: Account = new Account(name);
    this.accounts.set(name, account);

    // If everything went well return a 1;
    return 1;
  }

  deposit(accountName: string, depositAmount: number): number {
    // If the account doesn't exist return -1
    if (!this.accounts.has(accountName)) {
      console.log(`BANK NO HAVE ACCT ${accountName}`);
      return -1;
    }

    // Deposit money into the account
    this.accounts.get(accountName)?.deposit(depositAmount);

    // If went well return 1
    return 1;

  }

  withdraw(accountName: string, amount: number): number {
    // If the account doesn't exist return -1
    if (!this.accounts.has(accountName)) {
      return -1;
    }

    // Withdraw money from the account
    // if not enough funds return a -1
    const success: boolean | undefined = this.accounts.get(accountName)?.withdraw(amount);
    if (!success) {
      return -1;
    }

    // If went well return 1
    return 1;
  }

  transfer(accountName1: string, accountName2: string, amount: number): number {
    // make sure both accounts exist
    if (!this.accounts.has(accountName1)) {
      return -1;
    }
    if (!this.accounts.has(accountName2)) {
      return -1;
    }

    // Withdraw from account 1
    // if there were not enough funds in account1 then return a -1
    const success: boolean | undefined = this.accounts.get(accountName1)?.withdraw(amount);
    if (!success) {
      return -1;
    }

    // deposit funds in account2
    this.accounts.get(accountName2)?.deposit(amount);

    return 1;
  }

  getTopTransactionAccounts(numAccounts: number): Account[] {
    const accounts = Array.from(this.accounts.values());
    accounts.sort((a, b) => {
      // if same sort alphabetically by name
      if (a.getTransaction() === b.getTransaction()) {
        return a.getName().localeCompare(b.getName());
      }
      // If different sort by transaction highest to lowest
      return b.getTransaction() - a.getTransaction();
    })
    return accounts.slice(0, numAccounts);
  }


}





const inputs: string[][] = [
  ["CREATE_ACCOUNT", "acc1"],
  ["DEPOSIT", "acc1", "500"],
  ["CREATE_ACCOUNT", "acc2"],
  ["DEPOSIT", "acc2", "200"],
  ["TRANSFER", "acc1", "acc2", "100"],
  ["TRANSFER", "acc1", "acc3", "600"],  // Error: destination account does not exist
  ["CREATE_ACCOUNT", "acc3"],
  ["DEPOSIT", "acc3", "700"],
  ["TRANSFER", "acc3", "acc1", "800"],  // Error: not enough funds
  ["WITHDRAW", "acc1", "100"],
  ["WITHDRAW", "acc2", "50"],
  ["TRANSFER", "acc1", "acc2", "300"],
  ["TRANSFER", "acc2", "acc1", "150"],
  ["CREATE_ACCOUNT", "acc4"],
  ["DEPOSIT", "acc4", "400"],
  ["TRANSFER", "acc3", "acc4", "100"],
  ["TRANSFER", "acc4", "acc3", "50"],
  ["TOP_TRANSACTIONS", "5"],
  ["CREATE_ACCOUNT", "acc5"],
  ["DEPOSIT", "acc5", "1000"],
  ["TRANSFER", "acc5", "acc4", "500"],
  ["TRANSFER", "acc4", "acc5", "250"],
  ["WITHDRAW", "acc4", "150"],
  ["CREATE_ACCOUNT", "acc6"],
  ["DEPOSIT", "acc6", "50"],
  ["TRANSFER", "acc6", "acc5", "100"],  // Error: not enough funds
  ["DEPOSIT", "acc6", "200"],
  ["TRANSFER", "acc6", "acc5", "250"],
  ["TRANSFER", "acc5", "acc6", "300"],
  ["TOP_TRANSACTIONS", "3"],
  ["CREATE_ACCOUNT", "acc7"],
  ["DEPOSIT", "acc7", "100"],
  ["TRANSFER", "acc7", "acc6", "50"],
  ["WITHDRAW", "acc7", "20"],
  ["TRANSFER", "acc7", "acc1", "50"],
  ["CREATE_ACCOUNT", "acc8"],
  ["TRANSFER", "acc7", "acc8", "30"],
  ["TRANSFER", "acc8", "acc7", "10"],
  ["TRANSFER", "acc8", "acc7", "50"],   // Error: not enough funds
  ["TOP_TRANSACTIONS", "10"],
  ["CREATE_ACCOUNT", "acc9"],
  ["TRANSFER", "acc8", "acc9", "50"],
  ["TRANSFER", "acc9", "acc8", "25"],
  ["CREATE_ACCOUNT", "acc10"],
  ["DEPOSIT", "acc10", "600"],
  ["TRANSFER", "acc10", "acc9", "300"],
  ["TRANSFER", "acc9", "acc10", "50"],
  ["TOP_TRANSACTIONS", "15"],
  ["DEPOSIT", "acc11", "100"],  // Error: account does not exist
  ["CREATE_ACCOUNT", "acc11"],
  ["DEPOSIT", "acc11", "300"],
  ["TRANSFER", "acc11", "acc10", "100"],
  ["CREATE_ACCOUNT", "acc12"],
  ["DEPOSIT", "acc12", "400"],
  ["TRANSFER", "acc12", "acc11", "200"],
  ["TRANSFER", "acc11", "acc12", "50"],
  ["TOP_TRANSACTIONS", "1"]
];

const bank = new Bank();

for (let i: number = 0; i < inputs.length - 1; i++) {
  const input: string[] = inputs[i];
  if (input[0] === "CREATE_ACCOUNT") {
    const resultCreate: number = bank.createAccount(input[1]);
    if (resultCreate === -1) {
      console.error(`${i} The account ${input[1]} has already been created.`)
    }
  } else if (input[0] === "DEPOSIT") {
    const accountName: string = input[1];
    const depositAmount: number = Number.parseInt(input[2], 10);
    const resultDeposit = bank.deposit(accountName, depositAmount);
    if (resultDeposit === -1) {
      console.error(`${i} The account ${accountName} does not exist`)
    }
  } else if (input[0] === "WITHDRAW") {

    const accountName: string = input[1];
    const withdrawAmount: number = Number.parseInt(input[2], 10);
    const result: number = bank.withdraw(accountName, withdrawAmount);

    if (result === -1) {
      console.error(`${i} The account ${accountName} does not exist`)
    }
  } else if (input[0] === "TRANSFER") {
    const acc1Name = input[1];
    const acc2Name = input[2];
    const amount = Number.parseInt(input[3], 10);

    if (i === 27) {
      console.log('\n\n');
      console.log(amount);
      console.log(bank.accounts.get(acc1Name));
      console.log(bank.accounts.get(acc2Name));
      console.log('\n\n');
    }

    const result = bank.transfer(acc1Name, acc2Name, amount);
    if (result === -1) {
      console.error(`${i} Cannot complete the transfer of ${amount} form account ${acc1Name} to account ${acc2Name}`);
    }

    if (i === 27) {
      console.log('\n\n');
      console.log(amount);
      console.log(bank.accounts.get(acc1Name));
      console.log(bank.accounts.get(acc2Name));
      console.log('\n\n');
    }

  } else if (input[0] === "TOP_TRANSACTIONS") {
    const topAccounts: Account[] = bank.getTopTransactionAccounts(Number.parseInt(input[1], 10));
    console.log(topAccounts.toString());
  }
}
