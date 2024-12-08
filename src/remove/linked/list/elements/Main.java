package remove.linked.list.elements;

/*

Given the head of a linked list and an integer val,
remove all the nodes of the linked list that has Node.val == val,
and return the new head.

Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]

Input: head = [], val = 1
Output: []

Input: head = [7,7,7,7], val = 7
Output: []
 */

import utils.Builder;
import utils.Printer;
import utils.models.ListNode;

//Remove Linked List Elements - Easy
//https://leetcode.com/problems/remove-linked-list-elements/description/
public class Main {
    public static void main(String[] args) {
        Integer[][] heads = {
                {1,2,6,3,4,5,6},
                {},
                {7,7,7,7}
        };
        Integer[] vals = {6,1,7};

        for (int i=0; i< vals.length; i++) {
            ListNode head = Builder.buildListNode(heads[i]);
            Printer.printListNode(head);
            ListNode result = Solution.removeElements(head, vals[i]);
            System.out.println(vals[i]);
            Printer.printListNode(result);
            System.out.println("\n\n");
        }
    }
}
