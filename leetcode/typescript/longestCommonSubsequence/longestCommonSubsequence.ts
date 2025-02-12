/**
1143. Longest Common Subsequence - Medium

Hint
Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

Example 1:

  Input: text1 = "abcde", text2 = "ace" 
  Output: 3  
  Explanation: The longest common subsequence is "ace" and its length is 3.


Example 2:

  Input: text1 = "abc", text2 = "abc"
  Output: 3
  Explanation: The longest common subsequence is "abc" and its length is 3.


Example 3:

  Input: text1 = "abc", text2 = "def"
  Output: 0
  Explanation: There is no such common subsequence, so the result is 0.
 */


// this is supposed to be done with dynamic programing ...
// Explanation by chatgpt
// ### **Understanding Dynamic Programming for Longest Common Subsequence (LCS)**

// Dynamic Programming (DP) is useful when solving problems that involve **breaking down a larger problem into smaller subproblems** and **storing previous results to avoid redundant calculations**.

// ---

// ## **How DP Works in This Problem**
// ### **1. Define the Subproblem**
// The main idea is:
// - If we already know the **LCS of some prefixes** of `text1` and `text2`, we can use that information to build the **LCS for longer prefixes**.

// We define `dp[i][j]` as:
// > The length of the **Longest Common Subsequence** of `text1[0..i]` and `text2[0..j]`.

// This means:
// - `dp[0][*] = 0` and `dp[*][0] = 0` because an empty string has an LCS length of `0` with anything.
// - If `text1[i] === text2[j]`, then that character must be part of the LCS, so we **increase** the LCS length from `dp[i-1][j-1]`.
// - If they **don’t match**, we take the **best result** from either:
//   - Ignoring the current character of `text1`: `dp[i-1][j]`
//   - Ignoring the current character of `text2`: `dp[i][j-1]`
//   - (This works because removing one character might reveal a longer subsequence.)

// ---

// ### **2. Fill the DP Table**
// We build a **2D table** where:
// - **Rows** represent prefixes of `text1`
// - **Columns** represent prefixes of `text2`
// - Each cell `dp[i][j]` stores the length of the LCS up to `text1[i]` and `text2[j]`.

// #### **Example:**
// For `text1 = "abcde"` and `text2 = "ace"`, the table is filled like this:

// |   | "" | a | c | e |
// |---|---|---|---|---|
// | **""** | 0 | 0 | 0 | 0 |
// | **a** | 0 | 1 | 1 | 1 |
// | **b** | 0 | 1 | 1 | 1 |
// | **c** | 0 | 1 | 2 | 2 |
// | **d** | 0 | 1 | 2 | 2 |
// | **e** | 0 | 1 | 2 | 3 |

// - `dp[1][1] = 1` because "a" matches.
// - `dp[3][2] = 2` because "ac" matches.
// - `dp[5][3] = 3` because "ace" is the final LCS.

// So, the **final answer is `dp[m][n] = 3`**.

// ---

// ### **3. Code Breakdown**
// ```typescript
// function longestCommonSubsequence(text1: string, text2: string): number {
//   const m = text1.length, n = text2.length;
//   const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

//   for (let i = 1; i <= m; i++) {
//     for (let j = 1; j <= n; j++) {
//       if (text1[i - 1] === text2[j - 1]) {
//         dp[i][j] = 1 + dp[i - 1][j - 1];  // Characters match → extend LCS
//       } else {
//         dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);  // Take best possible LCS
//       }
//     }
//   }

//   return dp[m][n]; // Final LCS length
// }
// ```

// ---

// ### **4. Why This Works**
// ✅ **Avoids recalculating subproblems**  
// Instead of recomputing subsequences recursively (which would be **exponential** time complexity), we store results and reuse them in `dp[i][j]`.

// ✅ **Time Complexity: O(m * n)**  
// We compute every entry in a **2D table of size `m × n`**, which is feasible for `m, n ≤ 1000`.

// ✅ **Space Complexity: O(m * n), can be reduced to O(min(m, n))**  
// By only storing the **previous row**, we can cut space to `O(min(m, n))`.

// ---

// ## **Key Takeaways**
// - **Dynamic Programming stores solutions to subproblems to avoid recomputation.**
// - We **build the solution step by step**, storing intermediate results.
// - The **LCS length is stored in `dp[m][n]`**, which represents the longest subsequence for both full strings.
// - This approach guarantees **optimal** results efficiently.

// Let me know if anything needs more clarification! 🚀

// One of the good solutions
function longestCommonSubsequence(text1: string, text2: string): number {
  let dp = Array(text1.length + 1).fill(0);
  for (let j = text2.length - 1; j >= 0; j--) {
    const curr = Array(text1.length + 1).fill(0);
    for (let i = text1.length - 1; i >= 0; i--) {
      console.log(text1[i], text2[j]);
      if (text1[i] === text2[j]) {
        console.log(dp);
        curr[i] = 1 + dp[i + 1];
      } else {
        curr[i] = Math.max(curr[i + 1], dp[i]);
      }
    }
    dp = curr;
    console.log(dp);
    if (j === text1.length - 2) {
      break;
    }
  }

  return dp[0];
};

// Doing it with recursion
// function longestCommonSubsequence(text1: string, text2: string): number {
//   // Build the array of array
//   const memo = Array.from({ length: text1.length }, () => new Array(text2.length).fill(-1));

//   function lcs(i: number, j: number): number {
//     // this is for stopping at the beginning
//     // and if text1 or text2 is longer
//     // Before anything can get filled in, this part must be hit
//     if (i < 0 || j < 0) {
//       return 0
//     };

//     if (memo[i][j] !== -1) {
//       return memo[i][j];
//     }

//     if (text1[i] === text2[j]) {
//       // So i - 1, j - 1 works because it ensures only sequential matches contribute to the LCS.
//       memo[i][j] = lcs(i - 1, j - 1) + 1;
//     } else {
//       memo[i][j] = Math.max(lcs(i - 1, j), lcs(i, j - 1));
//     }

//     return memo[i][j];
//   }

//   return lcs(text1.length - 1, text2.length - 1);
// }

// Derek ... can't do it
// interface Occurrence {
//   sub: string;
//   prevIndex: number;
// }

// function longestCommonSubsequence(text1: string, text2: string): number {
//   if (text1 === text2) {
//     return text1.length;
//   }
//   const shorter: string = text1.length < text2.length ? text1 : text2;
//   const longer: string = text1 === shorter ? text2 : text1;
//   const subs: Record<string, Occurrence> = {};
//   for (const letter of shorter) {
//     const hasLetter: boolean = longer.indexOf(letter) > -1;
//     if (hasLetter) {
//       for (const subStart in subs) {
//         const prevIndex: number = subs[subStart].prevIndex;
//         const newIndex: number = longer.indexOf(letter, prevIndex + 1);
//         if (newIndex > -1) {
//           subs[subStart].sub = subs[subStart].sub + letter;
//           subs[subStart].prevIndex = newIndex;
//         }
//       }
//       if (!subs.hasOwnProperty(letter)) {
//         subs[letter] = {
//           sub: letter,
//           prevIndex: longer.indexOf(letter)
//         }
//       }
//     }
//   }

//   let max = 0;
//   for (const s in subs) {
//     if (subs[s].sub.length > max) {
//       max = subs[s].sub.length;
//     }
//   }

//   console.log(subs);

//   return max;
// };

const inputs: string[][] = [
  ['abcde', 'ace'],
  // ['abc', 'abc'],
  // ['abc', 'def'],
  // ['bsbininm', 'jmjkbkjkv'],
  // ['oxcpqrsvwf', 'shmtulqrypy'],
  // ['abcba', 'abcbcba'],
  // ['mhunuzqrkzsnidwbun', 'szulspmhwpazoxijwbq']
]

for (const input of inputs) {
  console.log(longestCommonSubsequence(input[0], input[1]));
}