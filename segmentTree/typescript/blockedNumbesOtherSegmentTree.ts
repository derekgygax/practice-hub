export { };

/*
  In this problem you are given a bunch of arrays of these two types
    [1, x]
    [2, x, size]
  Then you are looking at the line on integers -infinity to infinity.
    [1, x] tells you that point x is blocked
    [2, x, size] tells you that you are trying to put a block starting at x and then going up to the size
      ex. [2, 3, 3] = means from 3 to 5 including
  The [1, x] actually establishes a block. The [2, x, size] is only looking but never puts in a block.
  If [2,x, size] goes over a [1, x] block it is NOT allowed
  You need to check if all the [2, x, size] will be allowed given the [1, x] blocks that have been established.
  Look at all of them and return a string like '1010011' where 1 means there are no problems and 0 means
  there was a block in that region already
*/

class SegmentTree {
  public tree: boolean[];
  public lazy: boolean[];
  private size: number;
  private offset: number;

  constructor(minVal: number, maxVal: number) {
    this.size = maxVal - minVal + 1;
    this.offset = -minVal;
    this.tree = new Array(4 * this.size).fill(false);
    this.lazy = new Array(4 * this.size).fill(false);
  }

  private updateRange(start: number, end: number, l: number, r: number, node: number): void {
    if (this.lazy[node]) {
      this.tree[node] = true;
      if (start !== end) {
        this.lazy[2 * node + 1] = true;
        this.lazy[2 * node + 2] = true;
      }
      this.lazy[node] = false;
    }

    if (start > end || start > r || end < l) {
      return;
    }

    // The lazy is when it doesn't go all the way down to the leaf
    if (start >= l && end <= r) {
      this.tree[node] = true;
      if (start !== end) {
        console.log("AZX");
        this.lazy[2 * node + 1] = true;
        this.lazy[2 * node + 2] = true;
      }
      return;
    }

    let mid = Math.floor((start + end) / 2);
    this.updateRange(start, mid, l, r, 2 * node + 1);
    this.updateRange(mid + 1, end, l, r, 2 * node + 2);
    this.tree[node] = this.tree[2 * node + 1] || this.tree[2 * node + 2];
  }

  private queryRange(start: number, end: number, l: number, r: number, node: number): boolean {
    if (start > end || start > r || end < l) {
      return false;
    }

    if (this.lazy[node]) {
      console.log("LAXY");
      this.tree[node] = true;
      if (start !== end) {
        this.lazy[2 * node + 1] = true;
        this.lazy[2 * node + 2] = true;
      }
      this.lazy[node] = false;
    }

    if (start >= l && end <= r) {
      return this.tree[node];
    }

    let mid = Math.floor((start + end) / 2);
    return this.queryRange(start, mid, l, r, 2 * node + 1) || this.queryRange(mid + 1, end, l, r, 2 * node + 2);
  }

  public blockPoint(point: number): void {
    const idx = point + this.offset;
    this.updateRange(0, this.size - 1, idx, idx, 0);
  }

  public canPlaceBlock(start: number, end: number): boolean {
    const l = start + this.offset;
    const r = end + this.offset;
    return !this.queryRange(0, this.size - 1, l, r, 0);
  }
}

function defineBlockers(input: number[][]): string {
  let minVal = Infinity;
  let maxVal = -Infinity;

  for (let op of input) {
    if (op[0] === 1 || op[0] === 2) {
      minVal = Math.min(minVal, op[1]);
      maxVal = Math.max(maxVal, op[1] + (op[0] === 2 ? op[2] - 1 : 0));
    }
  }
  // console.log(minVal, maxVal);

  const segmentTree = new SegmentTree(minVal, maxVal);
  let passes = '';

  for (let op of input) {
    if (op[0] === 1) {
      segmentTree.blockPoint(op[1]);
    }
  }

  // console.log(segmentTree.tree);

  for (let op of input) {
    if (op[0] === 2) {
      const result = segmentTree.canPlaceBlock(op[1], op[1] + op[2] - 1);
      passes += result ? '1' : '0';
    }
  }

  return passes;
}

// Example usage
const operations = [
  [
    [1, 2],
    [2, 3, 5],
    [1, 5],
    [2, 6, 4],
    [1, 13],
    [2, 9, 2],
    [2, 15, 4]
  ],
  [
    [1, -23],
    [1, 98],
    [2, 3, 6],
    [2, -158, 95],
    [2, -333, 456],
  ]
];
for (let i: number = 0; i < operations.length; i++) {
  console.log(defineBlockers(operations[i]));  // Output will depend on actual operations
}
