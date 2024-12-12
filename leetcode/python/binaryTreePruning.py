from typing import Optional


# Given the root of a binary tree, return the same tree where every subtree (of the given tree) not containing a 1 has been removed.

# A subtree of a node node is node plus every node that is a descendant of node.

# Input: root = [1,null,0,0,1]
# Output: [1,null,0,null,1]
# Explanation: 
# Only the red nodes satisfy the property "every subtree not containing a 1".
# The diagram on the right represents the answer.

# Input: root = [1,0,1,0,0,0,1]
# Output: [1,null,1,null,1]

# Input: root = [1,1,0,1,1,0,1,0]
# Output: [1,1,0,1,1,null,1]

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    
    def pruneTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        
        if (root == None):
            return None
      
        node = TreeNode(root.val)
        
        left = self.pruneTree(root.left)
        right = self.pruneTree(root.right)

        if (left == None and right == None and root.val == 0):
            return None
        else:
            node.left = left
            node.right = right
            return node


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

values = [1, 0, 1, 0, 0, 0, 1]
root = build_tree_from_list(values)

if __name__ == "__main__":
    
    solution = Solution()
    print(tree_to_list(solution.pruneTree(root)))