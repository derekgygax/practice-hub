package greatest.common.divisor.of.strings;

import java.util.Arrays;
import java.util.HashSet;

public class Solution {

    public static String gcdOfStrings(String str1, String str2) {
        if (str1.isEmpty() || str2.isEmpty()) {
            return "";
        }
        if (str1.equals(str2)) {
            return str1;
        }

        String gcd = "";
        String shortString = str1.length() > str2.length() ? str2 : str1;
        String longString = str1.length() > str2.length() ? str1 : str2;
        for (int i = shortString.length(); i > 0; i--) {
            if (((longString.length() % i)) != 0 && (shortString.length() % i != 0)) {
                continue;
            }
            String tester = shortString.substring(0, i);
            HashSet<String> shortDivided = new HashSet<>(Arrays.asList(shortString.split(tester)));
            HashSet<String> longDivided = new HashSet<>(Arrays.asList(longString.split(tester)));
            if (!longDivided.isEmpty() || !shortDivided.isEmpty()) {
                continue;
            } else {
                gcd = tester;
                break;
            }
        }
        return gcd;
    }
}
