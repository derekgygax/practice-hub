export { };

function defineBlockers(input: number[][]): string {
  let passes = '';
  const blockedPoints: number[] = [];

  // Process the input to block points
  for (let op of input) {
    if (op[0] === 1) {
      blockedPoints.push(op[1]);
    }
  }

  // Sort the blocked points for efficient binary search
  blockedPoints.sort((a, b) => a - b);

  // Function to perform binary search
  function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] >= target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }

  // Process the input to check blocks
  for (let op of input) {
    if (op[0] === 2) {
      const start = op[1];
      const end = op[1] + op[2] - 1;
      let blockPossible = true;

      // Binary search to find the first blocked point >= start
      const index = binarySearch(blockedPoints, start);

      // Check if the found point is within the range [start, end]
      if (index < blockedPoints.length && blockedPoints[index] <= end) {
        blockPossible = false;
      }

      passes += blockPossible ? '1' : '0';
    }
  }

  return passes;
}

// Example usage
const operations = [
  [
    [1, -999999],
    [1, 999999],
    [2, -1000000, 2],
    [2, 999998, 3]
  ],
  [
    [1, -23],
    [1, 98],
    [2, 3, 6],
    [2, -158, 95],
    [2, -333, 456],
  ]
];

for (let i = 0; i < operations.length; i++) {
  console.log(defineBlockers(operations[i]));  // Output will depend on actual operations
}
