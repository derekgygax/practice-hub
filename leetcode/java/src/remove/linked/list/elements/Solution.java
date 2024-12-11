package remove.linked.list.elements;

import utils.models.ListNode;

public class Solution {
    public static ListNode removeElements(ListNode head, int val) {

        ListNode res = null;
        ListNode prev = null;
        boolean first = true;
        while (head != null) {
//            System.out.println(head.val);
            if (head.val == val) {
                head = head.next;
                continue;
            }
            ListNode newNode = new ListNode(head.val);

            if (first) {
                res = newNode;
                prev = newNode;
                first = false;
            } else {
                prev.next = newNode;
                prev = newNode;
            }
            head = head.next;
        }
        return res;
    }

//    public static ListNode removeElements(ListNode head, int val) {
//        if (head == null) {
//            return null;
//        }
//
//        ListNode newHead = null;
//        ListNode prev = null;
//        int iter = 0;
//
//        while (head != null) {
//            if (head.val == val) {
//                if (head.next == null) {
//                    if (prev != null) {
//                        prev.next = null;
//                    }
//                }
//                head = head.next;
//                continue;
//            }
//            if (iter == 0) {
//                newHead = head;
//            } else {
//                prev.next = head;
//            }
//            prev = head;
//
//            head = head.next;
//            iter++;
//        }
//
//
//        return newHead;
//    }
}


//function removeElements(head: ListNode | null, val: number): ListNode | null {
//
//        if (head === null) {
//        return null;
//        }
//
//let newHead: ListNode;
//let prev: ListNode;
//let first: boolean = true;
//        while (head !== null) {
//        if (head.val === val) {
//head = head.next;
//            continue;
//                    }
//                    const newNode: ListNode = new ListNode(head.val);
//
//        if (first) {
//first = false;
//newHead = newNode;
//prev = newNode;
//        } else {
//prev.next = newNode;
//prev = newNode;
//        }
//
//head = head.next;
//    }
//
//            return newHead ? newHead : null;
//        };