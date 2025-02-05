/*
https://leetcode.com/problems/add-two-numbers/description/

2. Add Two Numbers | Medium

You are given two non-empty linked lists representing two non-negative integers. 
The digits are stored in reverse order, and each of their nodes contains a single digit.
Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Input: l1 = [0], l2 = [0]
Output: [0]

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

*/

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

import { ListNode } from "./models/ListNode";

// Derek original ... after having done it many times months ago
// function add(l1: ListNode | null, l2: ListNode | null, carry: boolean): ListNode | null {

//   if (!l1 && !l2) {
//     if (carry) {
//       return new ListNode(1);
//     }
//     return null;
//   }

//   const newL = new ListNode();
//   let sum: number = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + (carry ? 1 : 0);
//   carry = false;
//   if (sum >= 10) {
//     carry = true;
//     sum = sum % 10;
//   }

//   newL.val = sum;
//   newL.next = add((l1 ? l1.next : null), (l2 ? l2.next : null), carry);

//   return newL;
// }

// function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
//   return add(l1, l2, false);
// };


// LETTCODE says good (not mine)
// Math.floor() always rounds down at an integer
//   4.7 -> 4
//   -4.7 -> -5

// Math.trunc() removes after the decimal
//   4.7 -> 4
//   -4.7 -> -4

class Solution {
  addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let dummy = new ListNode(0);
    let temp = dummy;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry !== 0) {
      let val1 = l1 ? l1.val : 0;
      let val2 = l2 ? l2.val : 0;

      let sum = val1 + val2 + carry;
      carry = Math.floor(sum / 10);
      temp.next = new ListNode(sum % 10);
      temp = temp.next;

      if (l1 !== null) l1 = l1.next;
      if (l2 !== null) l2 = l2.next;
    }

    return dummy.next;
  }
}