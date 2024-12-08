package fizz.buzz;

import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> fizzBuzz(int n) {
        ArrayList<String> words = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            String word = Integer.toString(i);
            if (i % 3 == 0 && i % 5 == 0) {
                word = "FizzBuzz";
            } else if (i % 3 == 0) {
                word = "Fizz";
            } else if (i % 5 == 0) {
                word = "Buzz";
            }
            words.add(word);
        }
        return words;
    }
}
