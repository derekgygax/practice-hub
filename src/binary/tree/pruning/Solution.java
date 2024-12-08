package binary.tree.pruning;

import utils.models.TreeNode;

public class Solution {
    public static TreeNode pruneTree(TreeNode root) {

//        System.out.println("root = " + (root != null ? root.val : null));
        if (root == null) {
            return null;
        }

        TreeNode newNode = new TreeNode(root.val);

        TreeNode left = pruneTree(root.left);
        TreeNode right = pruneTree(root.right);

//        System.out.println("left = " + (left != null ? left.val : null) + " right = " + (right != null ? right.val : null));

        if (left == null && right == null) {
            if (newNode.val == 0) {
                return null;
            }
        } else {
            newNode.left = left;
            newNode.right = right;
        }

        return newNode;
    }
}
