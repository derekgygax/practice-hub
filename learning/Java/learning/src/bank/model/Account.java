package bank.model;

public class Account {
    String name;
    int total;
    int transaction;


    public Account(String name) {
        this.name = name;
        this.total = 0;
        this.transaction = 0;
    }

    public int deposit(int amount) {
        if (amount < 0) {
            if (this.total < Math.abs(amount)) {
                return -1;
            }
        }
        this.total += amount;
        this.transaction += Math.abs(amount);
        return 1;
    }

    public String toString() {
        return "{name="+this.name+", total="+this.total+", transaction="+this.transaction+"}";
    }
}
