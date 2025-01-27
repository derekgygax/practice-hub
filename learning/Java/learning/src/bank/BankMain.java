package bank;

//Design a simple banking system. It needs to be able
//
//-Bank
//-Create account
//  -If already there return -1
//-Deposit to account (including adding and removing)
//  -If not enough funds then return -1
//-Transfer from one account to another (remember to block if not enough money and shit)
//  -If account doesn't exist return -1
//  -If not enough funds return -1
//-Find n accounts with the most transaction amount (negative and positive are both transaction amounts)
//  -Return by amount first and then if they are the same amount alphabetical
//
//
//input questions like this:
//[
//  ["CREATE_ACCOUNT", "acc1"]
//  ["DEPOSIT", "acc1", 300]
//  ["TRANSFER", "acc1", "acc2", 250]
//  ["TOP_TRANSACTIONS", 5]
//]

import bank.model.Account;
import bank.model.Bank;

import java.util.List;

public class BankMain {

    public static void main(String[] args) {
        String[][] inputs = {
                {"CREATE_ACCOUNT", "acc1"},
                {"DEPOSIT", "acc1", "500"},
                {"CREATE_ACCOUNT", "acc2"},
                {"DEPOSIT", "acc2", "200"},
                {"TRANSFER", "acc1", "acc2", "100"},
                {"TRANSFER", "acc1", "acc3", "600"},  // Error: destination account does not exist
                {"CREATE_ACCOUNT", "acc3"},
                {"DEPOSIT", "acc3", "700"},
                {"TRANSFER", "acc3", "acc1", "800"},  // Error: not enough funds
                {"DEPOSIT", "acc1", "-100"},  // Withdraw funds from acc1
                {"DEPOSIT", "acc2", "-50"},   // Withdraw funds from acc2
                {"TRANSFER", "acc1", "acc2", "300"},
                {"TRANSFER", "acc2", "acc1", "150"},
                {"CREATE_ACCOUNT", "acc4"},
                {"DEPOSIT", "acc4", "400"},
                {"TRANSFER", "acc3", "acc4", "100"},
                {"TRANSFER", "acc4", "acc3", "50"},
                {"TOP_TRANSACTIONS", "5"},
                {"CREATE_ACCOUNT", "acc5"},
                {"DEPOSIT", "acc5", "1000"},
                {"TRANSFER", "acc5", "acc4", "500"},
                {"TRANSFER", "acc4", "acc5", "250"},
                {"DEPOSIT", "acc4", "-150"},  // Withdraw funds from acc4
                {"CREATE_ACCOUNT", "acc6"},
                {"DEPOSIT", "acc6", "50"},
                {"TRANSFER", "acc6", "acc5", "100"},  // Error: not enough funds
                {"DEPOSIT", "acc6", "200"},
                {"TRANSFER", "acc6", "acc5", "250"},  // Error: not enough funds
                {"TRANSFER", "acc5", "acc6", "300"},
                {"TOP_TRANSACTIONS", "3"},
                {"CREATE_ACCOUNT", "acc7"},
                {"DEPOSIT", "acc7", "100"},
                {"TRANSFER", "acc7", "acc6", "50"},
                {"DEPOSIT", "acc7", "-20"},   // Withdraw funds from acc7
                {"TRANSFER", "acc7", "acc1", "50"},
                {"CREATE_ACCOUNT", "acc8"},
                {"TRANSFER", "acc7", "acc8", "30"},
                {"TRANSFER", "acc8", "acc7", "10"},
                {"TRANSFER", "acc8", "acc7", "50"},   // Error: not enough funds
                {"TOP_TRANSACTIONS", "10"},
                {"CREATE_ACCOUNT", "acc9"},
                {"TRANSFER", "acc8", "acc9", "50"},
                {"TRANSFER", "acc9", "acc8", "25"},
                {"CREATE_ACCOUNT", "acc10"},
                {"DEPOSIT", "acc10", "600"},
                {"TRANSFER", "acc10", "acc9", "300"},
                {"TRANSFER", "acc9", "acc10", "50"},
                {"TOP_TRANSACTIONS", "15"},
                {"DEPOSIT", "acc11", "100"},  // Error: account does not exist
                {"CREATE_ACCOUNT", "acc11"},
                {"DEPOSIT", "acc11", "300"},
                {"TRANSFER", "acc11", "acc10", "100"},
                {"CREATE_ACCOUNT", "acc12"},
                {"DEPOSIT", "acc12", "400"},
                {"TRANSFER", "acc12", "acc11", "200"},
                {"TRANSFER", "acc11", "acc12", "50"},
                {"CREATE_ACCOUNT", "acc1"},
                {"TOP_TRANSACTIONS", "3"}
        };

        Bank bank = new Bank();

        for (String[] input: inputs) {
            if (input[0].equals("CREATE_ACCOUNT")) {
                int wasCreated = bank.createAccount(input[1]);
                if (wasCreated == -1) {
                    System.err.println("The account '"+input[1]+"' already exists");
                }
            } else if (input[0].equals("DEPOSIT")) {
                int depositWorked = bank.deposit(input[1], Integer.parseInt(input[2]));
                if (depositWorked == -1) {
                    System.err.println("The amount "+input[2]+" could not be deposited to the account "+input[1]);
                }
            } else if (input[0].equals("TRANSFER")) {
                int transferWorked = bank.transfer(input[1], input[2], Integer.parseInt(input[3]));
                if (transferWorked == -1) {
                    System.err.println("Could not transfer "+input[3]+" from '"+input[1]+"' to '"+input[2]+"'");
                }
            } else if (input[0].equals("TOP_TRANSACTIONS")) {
                List<Account> topTransactions = bank.getTopTransactionAccounts(Integer.parseInt(input[1]));
                System.out.println(topTransactions);
            }
        }

//        System.out.println(bank);

    }
}
