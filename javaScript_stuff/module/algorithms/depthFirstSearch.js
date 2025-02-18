
import { BinaryTree } from "../models/BinaryTree.js";


// Depth First Search (DFS)
// Depth-First Search (DFS) explores as far as possible along one branch before backtracking. 
// It uses recursion or a stack to track nodes. 
// The algorithm processes a node, moves to its left child, 
// continues down until it reaches a leaf, 
// then backtracks to the previous node and explores the right subtree. 
// This continues until all nodes are visited.

class BinaryTreeDFS extends BinaryTree {
  // Pre-Order: Root -> Left -> Right
  preOrder(node = this.root, result = []) {
    if (!node) {
      return result;
    };
    result.push(node.value);
    this.preOrder(node.left, result);
    this.preOrder(node.right, result);
    return result;
  }

  // In-Order: Left -> Root -> Right
  inOrder(node = this.root, result = []) {
    if (!node) {
      return result;
    };
    this.inOrder(node.left, result);
    result.push(node.value);
    this.inOrder(node.right, result);
    return result;
  }

  // Post-Order: Left -> Right -> Root
  postOrder(node = this.root, result = []) {
    if (!node) {
      return result;
    };
    this.postOrder(node.left, result);
    this.postOrder(node.right, result);
    result.push(node.value);
    return result;
  }
}

// Example Usage
const treeDFS = new BinaryTreeDFS();
treeDFS.insert(10);
treeDFS.insert(5);
treeDFS.insert(15);
treeDFS.insert(3);
treeDFS.insert(7);
treeDFS.insert(12);
treeDFS.insert(18);

console.log("Pre-Order:", treeDFS.preOrder());  // Expected: [10, 5, 3, 7, 15, 12, 18]
console.log("In-Order:", treeDFS.inOrder());    // Expected: [3, 5, 7, 10, 12, 15, 18]
console.log("Post-Order:", treeDFS.postOrder()); // Expected: [3, 7, 5, 12, 18, 15, 10]
