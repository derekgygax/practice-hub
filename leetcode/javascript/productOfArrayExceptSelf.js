/**
 Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

Example 1:
Input: nums = [1,2,3,4]
Output: [24,12,8,6]


Example 2:
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// answer on leetcode
var productExceptSelf = function (nums) {
  let n = nums.length;
  let prefix = new Array(n).fill(1);
  let suffix = new Array(n).fill(1);
  let ans = new Array(n).fill(1);

  // Fill prefix array
  for (let i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * nums[i - 1];
  }

  // Fill suffix array
  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i + 1];
  }

  console.log(nums);
  console.log(prefix);
  console.log(suffix);

  // Calculate the result
  for (let i = 0; i < n; i++) {
    console.log(ans[i], prefix[i], suffix[i]);
    ans[i] = prefix[i] * suffix[i];
  }

  return ans;
};



// var productExceptSelf = function(nums) {

// }

// var productExceptSelf = function (nums) {

//   const products = Array.from({ length: nums.length }, () => 1);
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = 0; j < nums.length; j++) {
//       if (j !== i) {
//         products[i] *= nums[j];
//       }
//     }
//   }
//   return products;
// };

inputs = [
  // [1, 2, 3, 4],
  [-1, 1, 0, -3, 3]
]

for (input of inputs) {
  const res = productExceptSelf(input);
  // console.log(res);
}