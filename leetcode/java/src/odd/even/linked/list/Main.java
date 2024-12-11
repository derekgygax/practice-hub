package odd.even.linked.list;

import utils.Builder;
import utils.models.ListNode;
import utils.Printer;

// Odd Even Linked List
// Given the head of a singly linked list,
// group all the nodes with odd indices together followed by the nodes with even indices,
// and return the reordered list.
// The first node is considered odd, and the second node is even, and so on.
// Note that the relative order
// inside both the even and odd groups should remain as it was in the input.
// You must solve the problem in O(1) extra space complexity and O(n) time complexity.

//Odd Even Linked List - Medium
//https://leetcode.com/problems/odd-even-linked-list/description/
public class Main {
    public static void main(String[] args) {

//        Input: head = [1,2,3,4,5];
//        Output: [1,3,5,2,4];

//        Input: head = [2,1,3,5,6,4,7]
//        Output: [2,3,6,7,1,5,4]
        Integer[][] inputs = {
            {1,2,3,4,5},
//            {2,1,3,5,6,4,7}
        };
        for (Integer[] input: inputs) {
            ListNode head = Builder.buildListNode(input);
            Printer.printListNode(head);
            ListNode oddEven = Solution.oddEvenList(head);
            Printer.printListNode(oddEven);
        }
    }
}
