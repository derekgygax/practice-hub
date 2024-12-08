package stack.full;

import java.util.Stack;

//take 5 elements from Stack if elements are full then create StackIsFull Checked Exception Otherwise print No exception
public class Main {

    public static void main(String[] args) {
        try {
            Stack<String> stack = new Stack<String>();
            stack.push("a");
            stack.push("b");
            stack.push("c");
            stack.push("d");
            stack.push("e");
//            stack.push("f");

            if (stack.size() > 5) {
                throw new StackIsFull("Stack if full");
            }
            if (stack.size() == 5) {
                throw new Exception("Stack is 5");
            }

            System.out.println("No exception");

        } catch (StackIsFull err) {
            System.err.println("StackIsFull error: " + err.getMessage());
        } catch (Exception err) {
            System.err.println("Other error: " + err.getMessage());
        }
    }
}


//        write down Sql Query for to retrieve Second Highest Salary from Employee Table
//
//        SELECT MAX(Salary) AS SecondHighestSalary FROM Employee WHERE Salary < (SELECT MAX(Salary) FROM Employee);