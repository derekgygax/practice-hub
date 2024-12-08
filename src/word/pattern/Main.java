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
//Example 2:
//Input: pattern = "abba", s = "dog cat cat fish"
//Output: false
//Example 3:
//Input: pattern = "aaaa", s = "dog cat cat dog"
//Output: false

//Word Pattern - Easy
//https://leetcode.com/problems/word-pattern/description/
public class Main {
    public static void main(String[] args) {

        String patter = "abba";
        String s = "dog cat cat dog";
        System.out.println(Solution.wordPattern(patter, s));

        String patter2 = "abba";
        String s2 = "dog cat cat fish";
        System.out.println(Solution.wordPattern(patter2, s2));

        String patter3 = "aaaa";
        String s3 = "dog cat cat dog";
        System.out.println(Solution.wordPattern(patter3, s3));
    }
}
