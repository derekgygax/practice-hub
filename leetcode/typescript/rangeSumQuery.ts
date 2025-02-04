/*
303. Range Sum Query - Immutable Easy Topics

Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
 

Example 1:

Input
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output
[null, 1, -1, -3]

Explanation
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
 

Constraints:

1 <= nums.length <= 104
-105 <= nums[i] <= 105
0 <= left <= right < nums.length
At most 104 calls will be made to sumRange.
*/


/*
I didn't understand this at first but I get it now
Pretty much it wants the sum in an array given positions in the array being inclusive

Here is an example

array = [-2, 3, 1, 5, 9, 4, -5, 7]

it wants the sum from 1, 3
  3 + 1 + 5 = 11
OR
from 2, 5
  1 + 5 + 9 + 4 = 19


BUT it is going to do 100000 queries, so doing the looping every time
takes too much time and so instead you need to do something so the looping doesn't need to happen

They say to use prefixSums. So in the class you build the following array (starting over with small array for example)
array = [5,3,9]
prefixSum = [sum array[0] + array[0], sum array[0] + array[1], sum array[0] + array[2]]
so prefixSum = [5, 8, 17]

Then if they ask for sum(0, 0) you just return prefixSum[0]
If they ask for sum (1, 2) you return prefixSum[2] - prefixSum[1]

Does that make sense


*/


class NumArray {
  private prefixSums: number[];


  constructor(nums: number[]) {
    // initiatlizig this way is better for memory
    // also doesn't cause the array to be dynamically changed which is overhead
    this.prefixSums = new Array(nums.length)
    this.prefixSums[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
      this.prefixSums[i] = nums[i] + this.prefixSums[i - 1];
    }
  }

  sumRange(left: number, right: number): number {
    if (left === 0) {
      return this.prefixSums[right];
    }
    return this.prefixSums[right] - this.prefixSums[left - 1];
  }
}

/**
* Your NumArray object will be instantiated and called as such:
* var obj = new NumArray(nums)
* var param_1 = obj.sumRange(left,right)
*/