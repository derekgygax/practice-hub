package plus.one;

import java.util.LinkedList;

public class Solution {
    public static int[] plusOne(int[] digits) {

        LinkedList<Integer> result = new LinkedList<>();
        boolean carry = false;
        boolean first = true;
        for (int i=digits.length - 1; i>=0; i--) {
            int digit = digits[i];
            if (first) {
                digit++;
                first = false;
            }
            if (carry) {
                digit++;
                carry = false;
            }
            if (digit > 9) {
                carry = true;
                digit = digit % 10;
            }
            result.addFirst(digit);
        }
        if (carry) {
            result.addFirst(1);
        }

        return result.stream().mapToInt(Integer::intValue).toArray();
    }
}

// LEET CODE SOLUTIONS. GOOD
// See how it just keeps adding each one at each row that need to
// and if it doesn't need to then it just returns
//class Solution {
//    public int[] plusOne(int[] digits) {
//        for (int i = digits.length - 1; i >= 0; i--) {
//            if (digits[i] + 1 != 10) {
//                digits[i] += 1;
//                return digits;
//            }
//            digits[i] = 0;
//        }
//
//        int[] newDigits = new int[digits.length + 1];
//        newDigits[0] = 1;
//        return newDigits;
//    }
//}
