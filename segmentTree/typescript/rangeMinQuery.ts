/*
CHAT GPT gave me
Problem: Range Minimum Query (RMQ)

Description:
Given an array of integers, efficiently answer multiple queries that ask for the minimum value in a specific range of the array. 
Additionally, allow updates to the array, where an element at a specific index can be changed.

Example:

Array: [2, 5, 1, 4, 9, 3]

Queries:

What is the minimum value between indices 1 and 4?

Answer: 1 (the minimum value in the range [5, 1, 4, 9] is 1)
Update the value at index 3 to 0. The array becomes [2, 5, 1, 0, 9, 3].

What is the minimum value between indices 2 and 5?

Answer: 0 (the minimum value in the range [1, 0, 9, 3] is 0)
*/

class SegmentTree {
  public nums: number[];
  public tree: number[];


  constructor(nums: number[]) {
    this.nums = nums;

    this.tree = new Array(nums.length * 4);
    this.buildTree(0, 0, nums.length - 1);

  }

  maninpulateTree(node: number, tl: number, tr: number, save: (tl: number) => number | undefined) {
    if (tl === tr) {
      this.tree[node] = save(tl) || this.tree[node];
    } else {
      const middle = Math.floor((tl + tr) / 2);
      this.maninpulateTree((node * 2) + 1, tl, middle, save);
      this.maninpulateTree((node * 2) + 2, middle + 1, tr, save);
      this.tree[node] = Math.min(this.tree[(node * 2) + 1], this.tree[(node * 2) + 2]);
      // console.log(node, Math.min(this.tree[(node * 2) + 1], (node * 2) + 2), this.tree[(node * 2) + 1])
    }

  }

  buildTree(node: number, tl: number, tr: number): void {
    // console.log(node, tl, tr);
    const save = (tl: number) => {
      return this.nums[tl];
    }

    this.maninpulateTree(node, tl, tr, save);
    // if (tl === tr) {
    //   this.tree[node] = this.nums[tl];
    // } else {
    //   const middle = Math.floor((tl + tr) / 2);
    //   this.buildTree((node * 2) + 1, tl, middle);
    //   this.buildTree((node * 2) + 2, middle + 1, tr);
    //   this.tree[node] = Math.min(this.tree[(node * 2) + 1], this.tree[(node * 2) + 2]);
    //   // console.log(node, Math.min(this.tree[(node * 2) + 1], (node * 2) + 2), this.tree[(node * 2) + 1])
    // }

  }

  updateTree(node: number, tl: number, tr: number, index: number, val: number): void {
    const save = (tl: number) => {
      if (tl === index) {
        return val;
      }
      return undefined
    }
    this.maninpulateTree(node, tl, tr, save);

    // if (tl === tr) {
    //   if (tl === index) {
    //     this.tree[node] = val;
    //   }
    // } else {
    //   const middle = Math.floor((tl + tr) / 2);
    //   this.updateTree((node * 2) + 1, tl, middle, index, val);
    //   this.updateTree((node * 2) + 2, middle + 1, tr, index, val);
    //   this.tree[node] = Math.min(this.tree[(node * 2) + 1], this.tree[(node * 2) + 2]);
    // }
  }

  update(index: number, val: number): void {
    this.nums[index] = val;

    this.updateTree(0, 0, this.nums.length - 1, index, val);
  }


  rangeMin(left: number, right: number): number {

    const getMin = (node: number, tl: number, tr: number, l: number, r: number): number => {

      if (l > r) {
        return Infinity;
      }

      if (tl === l && tr === r) {
        return this.tree[node];
      }

      const middle: number = Math.floor((tl + tr) / 2);
      const minLeft: number = getMin((node * 2) + 1, tl, middle, l, Math.min(middle, r));
      const minRight: number = getMin((node * 2) + 2, middle + 1, tr, Math.max(middle + 1, l), r);

      return Math.min(minLeft, minRight);
    }

    return getMin(0, 0, this.nums.length - 1, left, right);

  }
}

const a = [2, 5, 1, 4, 9, 3];

const t = new SegmentTree(a);
// console.log(t.nums, t.tree);
t.update(3, -3);
// console.log(t.nums);
// console.log(t.tree);
console.log(t.rangeMin(0, 3));