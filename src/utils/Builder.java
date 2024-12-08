package utils;

import utils.models.ListNode;
import utils.models.NodeWithRandom;
import utils.models.TreeNode;

import java.util.ArrayList;
import java.util.LinkedList;

public class Builder {

    public static NodeWithRandom buildNodeListWithRandom(Integer[][] inputs) {

        ArrayList<NodeWithRandom> nodes = new ArrayList<>();
        NodeWithRandom prev = null;
        NodeWithRandom start = null;
        int i = 0;
        for (Integer[] input: inputs) {
            NodeWithRandom node = new NodeWithRandom(input[0], i);
            nodes.add(node);
            if (prev != null) {
                prev.next = node;
            } else {
                start = node;
            }
            prev = node;
            i++;
        }
        for (int x = 0; x < inputs.length; x++) {
            nodes.get(x).random = inputs[x][1] == null ? null : nodes.get(inputs[x][1]);
        }

        return start;
    }

    public static ListNode buildListNode(Integer[] vals) {

        ListNode head = null;
        ListNode prev = null;
        for (Integer val: vals) {
            ListNode newNode = new ListNode(val);
            if (head == null) {
                head = newNode;
                prev = newNode;
            } else {
                prev.next = newNode;
                prev = prev.next;
            }
        }

        return head;
    }

    public static TreeNode buildTree(Integer[] vals) {
        TreeNode root = null;
        TreeNode parent = null;
        LinkedList<TreeNode> queue = new LinkedList<>();
        boolean doneLeft = false;
        for (Integer val: vals) {
            TreeNode current = null;
            if (val != null) {
                current = new TreeNode(val);
            }

            if (root == null) {
                root = current;
                queue.addLast(root);
                continue;
            }

            if (!doneLeft) {
                parent = queue.removeFirst();
                parent.left = current;
                doneLeft = true;
            } else {
                parent.right = current;
                doneLeft = false;
            }
            if (current != null) {
                queue.addLast(current);
            }
        }

        return root;
    }
}
