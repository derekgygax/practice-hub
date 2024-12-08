package binary.tree.pruning;

import utils.Builder;
import utils.models.TreeNode;

//Given the root of a binary tree, return the same tree where every subtree (of the given tree) not containing a 1 has been removed.
//A subtree of a node node is node plus every node that is a descendant of node.

//Binary Tree Pruning - Medium
//https://leetcode.com/problems/binary-tree-pruning/description/
public class Main {
    public static void main(String[] args) {

//        Explanation:
//        Only the red nodes satisfy the property "every subtree not containing a 1".
//                The diagram on the right represents the answer.
//        Input: root = [1,null,0,0,1]
//        Output: [1,null,0,null,1]
        Integer[] vals = {1,null,0,0,1};
        TreeNode root = Builder.buildTree(vals);
        System.out.println(Solution.pruneTree(root));

//        Input: root = [1,0,1,0,0,0,1]
//        Output: [1,null,1,null,1]
        Integer[] vals2 = {1,0,1,0,0,0,1};
        TreeNode root2 = Builder.buildTree(vals2);
        System.out.println(Solution.pruneTree(root2));

//        Input: root = [1,1,0,1,1,0,1,0]
//        Output: [1,1,0,1,1,null,1]
        Integer[] vals3 = {1,1,0,1,1,0,1,0};
        TreeNode root3 = Builder.buildTree(vals3);
        System.out.println(Solution.pruneTree(root3));
    }
}
