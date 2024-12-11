package odd.even.linked.list;

import utils.models.ListNode;

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public static ListNode oddEvenList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode first = head;
        ListNode odd = head;
        ListNode even = head.next;
        ListNode firstEven = even;
        head = head.next.next;
        boolean isOdd = true;
        while (head != null) {
            if (isOdd) {
                odd.next = head;
                odd = odd.next;
            }else {
                even.next = head;
                even = even.next;
            }
            isOdd = !isOdd;
            head = head.next;
        }
        // Must terminate the even list
        even.next = null;
        odd.next = firstEven;

        return first;
    }
}