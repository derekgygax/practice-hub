export { }
/*
  In this question you will get a matrix, number[][].
  You have to decided if a point i, j in the matrix is a local maximum
  A local maximum occurs if the point is not a zero AND around that point
  within a range defined by (matrix[i][j] * 2 + 1) there is not another
  number that is equal to or greater than matrix[i][j].
*/

type Matrix = number[][];
type Point = [number, number];

function findLocalMaxima(matrix: Matrix): Point[] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const localMaxima: Point[] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const currentValue = matrix[i][j];
      if (currentValue === 0) continue;

      const range = currentValue * 2 + 1;
      let isLocalMax = true;

      for (let x = Math.max(0, i - range); x <= Math.min(rows - 1, i + range); x++) {
        for (let y = Math.max(0, j - range); y <= Math.min(cols - 1, j + range); y++) {
          if ((x !== i || y !== j) && matrix[x][y] >= currentValue) {
            isLocalMax = false;
            break;
          }
        }
        if (!isLocalMax) break;
      }

      if (isLocalMax) {
        localMaxima.push([i, j]);
      }
    }
  }

  return localMaxima;
}

const testCases: { matrix: Matrix, localMaxima: number[][] }[] = [
  {
    matrix: [
      [0, 1, 2, 0, 1, 2, 3, 4, 1, 0],
      [1, 4, 5, 3, 2, 1, 0, 1, 2, 3],
      [2, 5, 9, 6, 4, 2, 1, 2, 3, 4],
      [0, 4, 6, 7, 5, 3, 2, 3, 4, 5],
      [1, 3, 5, 6, 8, 7, 5, 4, 3, 2],
      [2, 2, 4, 5, 7, 9, 8, 6, 4, 3],
      [3, 1, 3, 4, 6, 8, 9, 7, 5, 4],
      [4, 0, 2, 3, 5, 7, 8, 9, 6, 5],
      [5, 1, 1, 2, 4, 6, 7, 8, 7, 6],
      [0, 0, 0, 1, 3, 5, 6, 7, 6, 5]
    ],
    localMaxima: [[2, 2], [5, 5], [6, 6], [7, 7]] // Identified local maxima points
  },
  {
    matrix: [
      [0, 0, 1, 2, 0, 1, 2, 3, 0, 1],
      [1, 2, 3, 4, 1, 2, 3, 4, 2, 1],
      [2, 3, 4, 5, 2, 3, 4, 5, 3, 2],
      [3, 4, 5, 6, 3, 4, 5, 6, 4, 3],
      [4, 5, 6, 7, 4, 5, 6, 7, 5, 4],
      [5, 6, 7, 8, 5, 6, 7, 8, 6, 5],
      [6, 7, 8, 9, 6, 7, 8, 9, 7, 6],
      [7, 8, 9, 10, 7, 8, 9, 10, 8, 7],
      [8, 9, 10, 11, 8, 9, 10, 11, 9, 8],
      [9, 10, 11, 12, 9, 10, 11, 12, 10, 9]
    ],
    localMaxima: [] // No local maxima, as all points have equal or greater neighbors in range
  },
  {
    matrix: [
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      [8, 7, 6, 5, 4, 3, 2, 1, 0, 9],
      [7, 6, 5, 4, 3, 2, 1, 0, 9, 8],
      [6, 5, 4, 3, 2, 1, 0, 9, 8, 7],
      [5, 4, 3, 2, 1, 0, 9, 8, 7, 6],
      [4, 3, 2, 1, 0, 9, 8, 7, 6, 5],
      [3, 2, 1, 0, 9, 8, 7, 6, 5, 4],
      [2, 1, 0, 9, 8, 7, 6, 5, 4, 3],
      [1, 0, 9, 8, 7, 6, 5, 4, 3, 2],
      [0, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    ],
    localMaxima: [[0, 0], [1, 9], [9, 1]] // Identified local maxima points
  },
  {
    matrix: [
      [5, 4, 3, 2, 1, 0, 1, 2, 3, 4],
      [4, 3, 2, 1, 0, 1, 2, 3, 4, 5],
      [3, 2, 1, 0, 1, 2, 3, 4, 5, 6],
      [2, 1, 0, 1, 2, 3, 4, 5, 6, 7],
      [1, 0, 1, 2, 3, 4, 5, 6, 7, 8],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      [4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    ],
    localMaxima: [[9, 9]] // Identified local maxima point
  },
  {
    matrix: [
      [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      [8, 7, 6, 5, 4, 3, 2, 1, 0, 9],
      [7, 6, 5, 4, 3, 2, 1, 0, 9, 8],
      [6, 5, 4, 3, 2, 1, 0, 9, 8, 7],
      [5, 4, 3, 2, 1, 0, 9, 8, 7, 6],
      [4, 3, 2, 1, 0, 9, 8, 7, 6, 5],
      [3, 2, 1, 0, 9, 8, 7, 6, 5, 4],
      [2, 1, 0, 9, 8, 7, 6, 5, 4, 3],
      [1, 0, 9, 8, 7, 6, 5, 4, 3, 2]
    ],
    localMaxima: [[0, 0], [2, 9]] // Identified local maxima points
  }
];


testCases.forEach((test) => {
  console.log(findLocalMaxima(test.matrix));

})