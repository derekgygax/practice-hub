package add.two.numbers;

import utils.models.ListNode;

import java.util.HashMap;
import java.util.List;

public class Solution {

    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        if (l1 == null && l2 == null) {
            return null;
        }
        if (l1 == null) {
            return l2;
        }
        if (l2 == null) {
            return l1;
        }

        ListNode result = null;
        ListNode prev = null;
        boolean carryOver = false;
        int iter = 0;
        while (l1 != null || l2 != null) {

            int newVal = (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0);
            if (carryOver) {
                newVal++;
                carryOver = false;
            }

            if (newVal > 9) {
                newVal = newVal - 10;
//                newVal = newVal % 10;
                carryOver = true;
            }

            ListNode newNode = new ListNode(newVal);

            if (iter == 0) {
                result = newNode;
            } else {
                prev.next = newNode;
            }
            prev = newNode;

            iter++;

            if (l1 != null) {
                l1 = l1.next;
            }
            if (l2 != null) {
                l2 = l2.next;
            }
        }
        if (carryOver) {
            prev.next = new ListNode(1);
        }

        return result;
    }
}
