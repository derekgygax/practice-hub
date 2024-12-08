package code.list.with.random.pointer;

import utils.models.NodeWithRandom;

import java.util.ArrayList;
import java.util.HashMap;

public class Solution {
    public static NodeWithRandom copyRandomList(NodeWithRandom head) {

        NodeWithRandom newHead = null;
        NodeWithRandom prev = null;
        HashMap<NodeWithRandom, NodeWithRandom> oldNew = new HashMap<>();
        ArrayList<NodeWithRandom> needPlacing = new ArrayList<>();
        while (head != null) {
            NodeWithRandom newNode = new NodeWithRandom(head.val, head.index);
            if (head.random == null) {
                newNode.random = null;
            } else if (oldNew.containsKey(head.random)) {
                newNode.random = oldNew.get(head.random);
            } else {
                needPlacing.add(head);
            }
            if (newHead == null) {
                newHead = newNode;
            }
            if (prev != null) {
                prev.next = newNode;
            }
            prev = newNode;

            oldNew.put(head, newNode);
            head = head.next;
        }
        for (NodeWithRandom old: needPlacing) {
            oldNew.get(old).random = oldNew.get(old.random);
        }

        return newHead;
    }
}
