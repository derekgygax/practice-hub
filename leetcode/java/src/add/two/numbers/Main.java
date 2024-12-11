package add.two.numbers;

/*
You are given two non-empty linked lists representing two non-negative integers.
The digits are stored in reverse order, and each of their nodes contains a single digit.
Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Input: l1 = [0], l2 = [0]
Output: [0]

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
 */

import utils.Builder;
import utils.Printer;
import utils.models.ListNode;

//Add Two Numbers - Medium
//https://leetcode.com/problems/add-two-numbers/description/
public class Main {

    public static void main(String[] args) {

        Integer[][][] inputs = {
                {
                        {2,4,3},
                        {5,6,4}
                },
                {
                        {0},
                        {0}
                },
                {
                        {9,9,9,9,9,9,9},
                        {9,9,9,9}
                }
        };

        for (Integer[][] input: inputs) {
            ListNode l1 = Builder.buildListNode(input[0]);
            ListNode l2 = Builder.buildListNode(input[1]);

            ListNode result = Solution.addTwoNumbers(l1, l2);

            Printer.printListNode(l1);
            Printer.printListNode(l2);
            Printer.printListNode(result);
            System.out.println("\n\n");
        }

    }
}
