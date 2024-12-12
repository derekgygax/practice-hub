/*
Leet Code Problem

307. Range Sum Query - Mutable
Medium Topics Companies

Given an integer array nums, handle multiple queries of the following types:

Update the value of an element in nums.
Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.

Implement the NumArray class:
  -NumArray(int[] nums) Initializes the object with the integer array nums.
  -void update(int index, int val) Updates the value of nums[index] to be val.
  -int sumRange(int left, int right) Returns the sum of the elements of nums 
    between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
    class NumArray {
    constructor(nums: number[]) {
    }

    update(index: number, val: number): void {
        
    }

    sumRange(left: number, right: number): number {
        
    }
}

Example 1:

Input
  ["NumArray", "sumRange", "update", "sumRange"]
  [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output
  [null, 9, null, 8]

Explanation:
  NumArray numArray = new NumArray([1, 3, 5]);
  numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
  numArray.update(1, 2);   // nums = [1, 2, 5]
  numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8
*/


class NumArray {
  private nums: number[];
  public tree: number[];

  constructor(nums: number[]) {
    this.nums = nums;
    // Create the tree
    // This is how you start an array!!!
    // new Array(4 * this.size).fill(false);
    this.tree = new Array(nums.length * 4);
    this.buildTree(0, 0, nums.length - 1);
  }

  // You copied this off of the page you read. You are upset you couldn't figure it out yourself but for now move on
  private buildTree(node: number, tl: number, tr: number) {
    if (tl === tr) {
      this.tree[node] = this.nums[tl];
    } else {
      const middle: number = Math.floor((tl + tr) / 2);
      this.buildTree((node * 2) + 1, tl, middle);
      this.buildTree((node * 2) + 2, middle + 1, tr);
      this.tree[node] = this.tree[(node * 2) + 1] + this.tree[(node * 2) + 2];
    }
  }

  private updateTree(
    node: number,
    tl: number,
    tr: number,
    valChange: number,
    indexUpdated: number,
    keepGoing: boolean
  ): void {
    this.tree[node] += valChange;
    if (tl !== tr) {
      const middle: number = Math.floor((tl + tr) / 2);
      this.updateTree(
        indexUpdated <= middle ? (node * 2) + 1 : (node * 2) + 2,
        indexUpdated <= middle ? tl : middle + 1,
        indexUpdated <= middle ? middle : tr,
        valChange,
        indexUpdated,
        keepGoing
      )
    }
  }

  public getTree(): number[] {
    return this.tree;
  }
  public getNums(): number[] {
    return this.nums;
  }

  public update(index: number, val: number): void {
    // Find the total that everything changing
    const diff = val - this.nums[index];
    // Set the new value in the this.nums
    this.nums[index] = val;

    // repopulate the tree
    this.updateTree(
      0,
      0,
      this.nums.length - 1,
      diff,
      index,
      true
    );
  }

  // You couldn't figure it out yourself because you aren't able to focus, you looked it up. Fuck you
  sumRange(left: number, right: number) {
    if (right > this.nums.length - 1) {
      return -Infinity;
    }

    const getSum = (node: number, tl: number, tr: number, l: number, r: number) => {
      if (l > r) {
        return 0;
      }

      const middle = Math.floor((tl + tr) / 2);

      if (tl === l && tr === r) {
        console.log(node, tl, tr, l, r, this.tree[node]);
        return this.tree[node];
      }

      // step left
      const sumLeft: number = getSum((node * 2) + 1, tl, middle, l, Math.min(r, middle));
      // console.log(node, tl, tr, l, r, 'sumLeft = ', sumLeft);
      // step right
      const sumRight: number = getSum((node * 2) + 2, middle + 1, tr, Math.max(l, middle + 1), r);
      // console.log(node, tl, tr, l, r, 'sumRight = ', sumRight);

      return sumLeft + sumRight;
    }

    return getSum(0, 0, this.nums.length - 1, left, right)

  }

}

// const firstTree = new NumArray([1, 3, 5]);
// console.log(firstTree.getNums(), firstTree.getTree());
// firstTree.update(1, 2);
// // firstTree.update(2, 10);
// console.log(firstTree.getNums(), firstTree.getTree())

// console.log(firstTree.sumRange(0, 2));
// // console.log(firstTree.sumRange(1, 2));
// // console.log(firstTree.sumRange(2, 2));

const tree = new NumArray([4, 9, 3, 1, 6, 8, 7, 2]);
console.log(tree.getTree());
// console.log(tree.sumRange(2, 5));
console.log(tree.sumRange(4, 5));
// console.log(tree.sumRange(3, 4));