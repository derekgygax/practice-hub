package move.zeroes;

import java.util.Arrays;

public class Main {

    public static int[] moveZeros(int[] nums) {
        int lastNonZeroIndex = 0;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                int temp = nums[lastNonZeroIndex];
                nums[lastNonZeroIndex] = nums[i];
                nums[i] = temp;
                lastNonZeroIndex++;
            }
        }
        return nums;
    }

    public static void main(String[] args) {

        int[][] inputs = {
                {0, 1, 0, 3, 12},
                {0}
        };
        for (int[] input: inputs) {
            int[] moved = moveZeros(input);
            System.out.println(Arrays.toString(moved));
        }
    }
}