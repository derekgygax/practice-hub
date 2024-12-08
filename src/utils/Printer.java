package utils;

import utils.models.ListNode;
import utils.models.NodeWithRandom;

public class Printer {


    public static void printListNode(ListNode node) {
        System.out.print("[");
        while (node != null) {
            System.out.print(node.val);
            if (node.next != null) {
                System.out.print(", ");
            }
            node = node.next;
        }
        System.out.println("]");
    }

    public static void printNodeWithRandomList(NodeWithRandom node) {
        System.out.print("[");
        while (node != null) {
            System.out.print("[" + node.val + ", " + (node.random != null ? node.random.index : null) +  "]");
            if (node.next != null) {
                System.out.print(", ");
            }
            node = node.next;
        }
        System.out.println("]");
    }
}
