package bank.model;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

public class Bank {
    private final HashMap<String, Account> accounts;

    public Bank() {
        this.accounts = new HashMap<>();
    }

    public int createAccount(String name) {
        if (this.accounts.containsKey(name)) {
            return -1;
        }

        this.accounts.put(name, new Account(name));

        return 1;
    }

    public int deposit(String name, int amount) {
        if (!this.accounts.containsKey(name)) {
            return -1;
        }

        return this.accounts.get(name).deposit(amount);
    }

    public int transfer(String sendingAccount, String receivingAccount, int amount) {
        if (!this.accounts.containsKey(sendingAccount)) {
            return -1;
        }
        if (!this.accounts.containsKey(receivingAccount)) {
            return -1;
        }
        int subtractOk = this.accounts.get(sendingAccount).deposit(-amount);
        if (subtractOk == -1) {
            return -1;
        }
        return this.accounts.get(receivingAccount).deposit(amount);
    }

    public List<Account> getTopTransactionAccounts(int numAccounts) {
//        List<Account> accountsList = new ArrayList<>(this.accounts.values());
//
//        accountsList.sort(Comparator.comparingInt((Account a) -> {
//            return a.transaction;
//        }).reversed().thenComparing((Account a) -> {
//            return a.name;
//        }));
//
//        return accountsList.subList(0, Math.min(accountsList.size(), numAccounts));

//        List<Account> accountsList = new ArrayList<>(this.accounts.values());
//        accountsList.sort(Comparator.comparingInt((Account a) -> {
//            return a.transaction;
//        }).reversed().thenComparing((Account a) -> {
//            return a.name;
//        }));
//
//        return accountsList.subList(0, Math.min(numAccounts, accountsList.size()));


//        List<Account> accountsList = new ArrayList<Account>(this.accounts.values());
//        accountsList.sort(Comparator.comparingInt((Account a) -> {
//            return a.transaction;
//        }).reversed().thenComparing((Account a) -> {
//            return a.name;
//        }));
//        return accountsList.subList(0, Math.min(accountsList.size(), numAccounts));


        List<Account> listAccounts = new ArrayList<Account>(this.accounts.values());
        listAccounts.sort(Comparator.comparingInt((Account a) -> {
            return a.transaction;
        }).reversed().thenComparing((Account a) -> {
            return a.name;
        }));
        return listAccounts.subList(0, Math.min(listAccounts.size(), numAccounts));

    }

    public String toString() {
        return accounts.toString();
    }
}
