package maximum.subarray;

/**
 *
 * Given an integer array nums, find the subarray
 * with the largest sum, and return its sum.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: The subarray [4,-1,2,1] has the largest sum 6.
 *
 * Example 2:
 * Input: nums = [1]
 * Output: 1
 * Explanation: The subarray [1] has the largest sum 1.
 *
 * Example 3:
 * Input: nums = [5,4,-1,7,8]
 * Output: 23
 * Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 */
//Maximum Subarray - Medium
//https://leetcode.com/problems/maximum-subarray/description/
public class Main {

    public static void main(String[] args) {
        int[][] inputs = {
                {-2,1},
                {1,2},
                {-2,1,-3,4,-1,2,1,-5,4},
                {-2,1,-3,10,-1,2,1,-5,6},
                {1},
                {5,4,-1,7,8}
        };
        for (int[] input: inputs) {
            int total = Solution.maxSubArray(input);
            System.out.println(total);
            System.out.println("\n");
        }
    }
}
