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

// Derek's shit version 
// Bad for memory and storage
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {

  let list: ListNode | null = null;
  let prevListNode: ListNode | null = null;
  while (list1 && list2) {
    const newListNode = new ListNode();
    const list1Val = list1 ? list1.val : Number.MAX_VALUE;
    const list2Val = list2 ? list2.val : Number.MAX_VALUE;

    if (list1Val < list2Val) {
      newListNode.val = list1Val;
      if (list1) {
        list1 = list1.next;
      }
    } else {
      newListNode.val = list2Val
      if (list2) {
        list2 = list2.next;
      }
    }
    console.log(newListNode.val);
    if (prevListNode) {
      prevListNode.next = newListNode;
      prevListNode = newListNode;
    } else {
      list = newListNode;
      prevListNode = newListNode;
    }
  }

  return list;
};


// Best version
function mergeTwoListsBest(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let current = dummy;

  while (list1 && list2) {
    if (list1.val < list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }

    current = current.next;
  }

  if (list1) {
    current.next = list1;
  } else {
    current.next = list2;
  }

  return dummy.next;
};