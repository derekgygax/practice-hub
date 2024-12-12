from typing import List

"""
Given an integer array nums, find the subarray with the largest sum, and return its sum.

 

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
Example 2:

Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
"""

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_sum = nums[0]
        local_sum = nums[0]
        for num in nums[1:]:
          local_sum += num
          if local_sum < num:
            local_sum = num
          if max_sum < local_sum:
             max_sum = local_sum
        return max_sum

inputs = [
    [-2,1,-3,4,-1,2,1,-5,4],
    [1],
    [5,4,-1,7,8],
    [1,2],
    [-2,-1]
]

if __name__ == "__main__":
  sol = Solution()
  for input in inputs:
    print(sol.maxSubArray(input))