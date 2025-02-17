/**
Two Sum - Easy
https://leetcode.com/problems/two-sum/description/

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// const twoSum = (nums, target) => {

//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] == target) {
//         return [i, j];
//       }
//     }
//   }
// };

// because it says there is always a solution you can make some assumptions
// This was the better way
const twoSum = (nums, target) => {
  const matches = {};

  for (i = 0; i < nums.length; i++) {
    const num = nums[i];
    const match = target - num;

    if (num in matches) {
      return [matches[num], i];
    }

    matches[match] = i;
  }
}

const inputs = [
  [[2, 7, 11, 15], 9],
  [[3, 2, 4], 6],
  [[3, 3], 6]
]

for (const input of inputs) {
  result = twoSum(input[0], input[1]);
  console.log(result);
}