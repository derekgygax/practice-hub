import { BinaryTree } from "../models/BinaryTree.js";

// Breadth First Search (BFS)
// Breadth-First Search (BFS) starts at the root and explores all nodes at 
// the current depth level before moving to the next level. It uses a queue to track nodes, 
// adding children from left to right. The algorithm dequeues a node, processes it, and enqueues its children. 
// This continues until all nodes are visited.


class BinaryTreeBFS extends BinaryTree {
  constructor() {
    super();
  }

  bfs() {
    if (!this.root) {
      return [];
    };
    const queue = [this.root];
    const result = [];

    while (queue.length > 0) {
      let node = queue.shift();
      result.push(node.value);
      if (node.left) {
        queue.push(node.left)
      };
      if (node.right) {
        queue.push(node.right)
      };
    }

    return result;
  }
}

// Example Usage
const tree = new BinaryTreeBFS();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(12);
tree.insert(18);

console.log(tree.bfs());  // Expected Output: [10, 5, 15, 3, 7, 12, 18]
