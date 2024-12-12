"""
Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.

Example 1:

Input: pattern = "abba", s = "dog cat cat dog"
Output: true
Example 2:

Input: pattern = "abba", s = "dog cat cat fish"
Output: false
Example 3:

Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false
"""

class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        s_split = s.split(" ")

        if len(pattern) != len(s.split(' ')):
           return False
        
        pat = {}
        word_used = set()
        for index, letter in enumerate(pattern):
          if (letter not in pat):
             if s_split[index] in word_used:
                return False
             pat[letter] = s_split[index]
             word_used.add(s_split[index])
          else:
             if pat[letter] != s_split[index]:
                return False
        return True
          

inputs = [
   ["abba", "dog cat cat dog"],
   ["abba","dog cat cat fish"],
   ["aaaa","dog cat cat dog"]
]

if __name__ == "__main__":
  sol = Solution()
  for input in inputs:
    print(sol.wordPattern(input[0], input[1]))