// export { };

/*
  In this problem you are given a bunch of arrays of these two types
    [1, x]
    [2, x, size]
  Then you are looking at the line on integers -infinity to infinity.
    [1, x] tells you that point x is blocked
    [2, x, size] tells you that you are trying to put a block starting at x and then going up to the size
      ex. [2, 3, 3] = means from 3 to 5 including
  The [1, x] actually establishes a block. The [2, x, size] is only looking but never puts in a block.
  If [2,x, size] goes over a [1, x] block it is NOT allowed
  You need to check if all the [2, x, size] will be allowed given the [1, x] blocks that have been established.
  Look at all of them and return a string like '1010011' where 1 means there are no problems and 0 means
  there was a block in that region already
*/

function checkBlocks(operations: number[][]): string {
  // Map to store blocked intervals efficiently
  let blockedIntervals = new Map<number, number>();
  let result = "";

  // Function to add a block
  const addBlock = (start: number) => {
    if (!blockedIntervals.has(start)) {
      blockedIntervals.set(start, start);
    }
  };

  // Merge intervals function
  const mergeIntervals = () => {
    let merged = new Map<number, number>();
    let starts = Array.from(blockedIntervals.keys()).sort((a, b) => a - b);

    let [currentStart, currentEnd] = [starts[0], blockedIntervals.get(starts[0])!];
    for (let start of starts) {
      let end = blockedIntervals.get(start)!;
      if (start <= currentEnd + 1) {
        currentEnd = Math.max(currentEnd, end);
      } else {
        merged.set(currentStart, currentEnd);
        [currentStart, currentEnd] = [start, end];
      }
    }
    merged.set(currentStart, currentEnd);
    blockedIntervals = merged;
  };

  for (const operation of operations) {
    const type = operation[0];

    if (type === 1) {
      // Block the point x
      addBlock(operation[1]);
    }
  }

  // Merge intervals to consolidate consecutive blocked points
  mergeIntervals();

  for (const operation of operations) {
    if (operation[0] === 2) {
      const x = operation[1];
      const size = operation[2];
      let blockPossible = true;

      // Check if any interval overlaps
      for (let [start, end] of blockedIntervals) {
        if (Math.max(start, x) <= Math.min(end, x + size - 1)) {
          blockPossible = false;
          break;
        }
      }

      // Append '1' if block is possible, '0' if not
      result += blockPossible ? '1' : '0';
    }
  }

  return result;
}










const defineBlockers = (input: number[][]): string => {
  let passes = '';

  const blocks: number[] = [];
  const tries: number[][] = [];
  for (let i: number = 0; i < input.length; i++) {
    if (input[i][0] === 1) {
      blocks.push(input[i][1]);
    } else {
      tries.push([input[i][1], input[i][2]]);
    }
  }
  for (let attempt of tries) {
    let ok: boolean = true;
    for (let block of blocks) {
      if (block >= attempt[0] && block <= (attempt[0] + attempt[1] - 1)) {
        // console.log(block, attempt[0], attempt[0] + attempt[1] - 1);
        ok = false;
        break;
      }
    }
    if (ok) {
      passes += "1";
    } else {
      passes += "0";
    }
  }

  return passes;
}

const testInputs: number[][][] = [
  [
    [1, 2],
    [2, 3, 5],
    [1, 5],
    [2, 6, 4],
    [1, 13],
    [2, 9, 2],
    [2, 15, 4]
  ],
  [
    [1, -23],
    [1, 98],
    [2, 3, 6],
    [2, -158, 95],
    [2, -333, 456],
  ]
];

const testAnswers = [
  '0111',
  '110',
];

for (let i: number = 0; i < testInputs.length; i++) {
  // const ans = defineBlockers(testInputs[i]);
  // console.log(i, ans, testAnswers[i], ans === testAnswers[i] ? "CORRECT" : "WRONG");

  const ans = checkBlocks(testInputs[i]);
  console.log(i, ans, testAnswers[i], ans === testAnswers[i] ? "CORRECT" : "WRONG");


}