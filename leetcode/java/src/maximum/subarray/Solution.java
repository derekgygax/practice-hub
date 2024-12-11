package maximum.subarray;

import java.util.ArrayList;
import java.util.Objects;

public class Solution {
    public static int maxSubArray(int[] nums) {

        Integer higherTotal = null;
        Integer maybeTotal = null;

        for (int num: nums) {
            if (maybeTotal == null) {
                maybeTotal = num;
                higherTotal = num;
                continue;
            }
            maybeTotal += num;
            if (num > maybeTotal) {
                maybeTotal = num;
            }
            if (maybeTotal > higherTotal) {
                higherTotal = maybeTotal;
            }
        }

        return Objects.requireNonNullElse(higherTotal, Integer.MIN_VALUE);

    }


//    public static int maxSubArray(int[] nums) {
//
//        ArrayList<Integer> highArray = new ArrayList<>();
//        ArrayList<Integer> maybeArray = new ArrayList<>();
//        Integer higherTotal = null;
//        Integer maybeTotal = null;
//
//        for (int num: nums) {
//            if (maybeTotal == null) {
//                maybeTotal = num;
//                higherTotal = num;
//                maybeArray.add(num);
//                highArray.add(num);
//                continue;
//            }
//            maybeTotal += num;
//            maybeArray.add(num);
//            if (num > maybeTotal) {
//                maybeArray.clear();
//                maybeArray.add(num);
//                maybeTotal = num;
//            }
//            if (maybeTotal > higherTotal) {
//                higherTotal = maybeTotal;
//                highArray = new ArrayList<>(maybeArray);
//            }
//        }
//
//        System.out.println(highArray);
//
//        return Objects.requireNonNullElse(higherTotal, Integer.MIN_VALUE);
//
//    }

    // BETTER!!!
//    public int maxSubArray(int[] nums) {
//        int res = nums[0];
//        int total = 0;
//
//        for (int n : nums) {
//            if (total < 0) {
//                total = 0;
//            }
//
//            total += n;
//            res = Math.max(res, total);
//        }
//
//        return res;
//    }

}
