package word.pattern;

//Given a pattern and a string s, find if s follows the same pattern.
//
//Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s. Specifically:
//
//Each letter in pattern maps to exactly one unique word in s.
//Each unique word in s maps to exactly one letter in pattern.
//No two letters map to the same word, and no two words map to the same letter.

//Example 1:
//Input: pattern = "abba", s = "dog cat cat dog"
//Output: true
//Explanation:
//The bijection can be established as:
//        'a' maps to "dog".
//        'b' maps to "cat".

import java.util.HashMap;
import java.util.HashSet;

public class Solution {

    public static boolean wordPattern(String pattern, String s) {
        String[] pSplit = pattern.split("");
        String[] sSplit = s.split(" ");

        HashMap<String, String> pS = new HashMap<>();
        HashSet<String> sSeen = new HashSet<>();

        if (pSplit.length != sSplit.length) {
            return false;
        }

        for (int i = 0; i < pSplit.length; i++) {
            String pC = pSplit[i];
            String sC = sSplit[i];

            if (pS.containsKey(pC)) {
                if (!pS.get(pC).equals(sC)) {
                    return false;
                }
            } else {
                if (sSeen.contains(sC)) {
                    return false;
                }
                pS.put(pC, sC);
                sSeen.add(sC);
            }
        }

        return true;
    }














//    PAST
//    String[] pSplit = pattern.split("");
//    String[] sSplit = s.split(" ");
//
//        if (pSplit.length != sSplit.length) {
//        return false;
//    }
//
//    HashMap<String, String> pH = new HashMap<String, String>();
//    HashSet<String> seen = new HashSet<String>();
//
//        for (int i = 0; i < pSplit.length;  i++) {
//
//        if (pH.containsKey(pSplit[i])) {
//            if (!pH.get(pSplit[i]).equals(sSplit[i])) {
//                return false;
//            }
//        } else {
//            if (seen.contains(sSplit[i])) {
//                return false;
//            }
//            seen.add(sSplit[i]);
//            pH.put(pSplit[i], sSplit[i]);
//        }
//    }
//        return true;






}
