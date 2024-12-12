from typing import Optional

"""
Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

The left 
subtree
 of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

"""

def build_tree_from_list(values):
    if not values:
        return None
    
    root = TreeNode(values[0])
    queue = [root]
    i = 1

    while i < len(values):
        current = queue.pop(0)
        
        if i < len(values) and values[i] is not None:
            current.left = TreeNode(values[i])
            queue.append(current.left)
        i += 1
        
        if i < len(values) and values[i] is not None:
            current.right = TreeNode(values[i])
            queue.append(current.right)
        i += 1
    
    return root

def tree_to_list(root):
    if not root:
        return []
    
    result = []
    queue = [root]
    
    while queue:
        current = queue.pop(0)
        
        if current:
            result.append(current.val)
            queue.append(current.left)
            queue.append(current.right)
        else:
            result.append(None)
    
    # Remove trailing None values (optional, based on your preference)
    while result and result[-1] is None:
        result.pop()
    
    return result


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        print("")
        # left_is_valid = self.isValidBST(root.left)
        # right_is_valid = self.isValidBST(root.right)


inputs = [
    [2,1,3],
    [5,1,4,None,None,3,6],
]

if __name__ == "__main__":
  sol = Solution()
  for num in range(5):
      print(num)
  # for input in inputs:
  #     root = build_tree_from_list(input)
  #     sol.isValidBST(root)
    