// The problem is
// You have n number of steps
// how many distinct ways could you cimb them if you can do both 1 step or 2 steps at a time

// Solve this using dynamic programming, its also the same as the fibonaci sequence
// Think of it this way. If there are 10 steps total. How many different ways are there to take that last step.
// So you could either take 1 step or take 2 steps. So they before this you would be either on the 8th step
// or on the 9th step. So there are two ways and they are the number of ways to get to the 9th step and
// the number of ways to get to the 8th step. If you follow it down then its like this at every step.
// Its just a combination of the ways to get to the previous two steps.

// So you could do this with recursive programming or dynamic programming.
// Recursive you just keep going deeper where dynamic you fill an array and you build from the bottom up
// The main equatino for this:
// 
//    f(n) = f(n - 1) + f(n - 2);
//
// Solve it both ways

// Recursive
const recursive = (numSteps: number): number => {

  if (numSteps <= 0) {
    return 1;
  }
  if (numSteps === 1) {
    return 1;
  }
  if (numSteps === 2) {
    return 2;
  }

  return recursive(numSteps - 1) + recursive(numSteps - 2);
}

// Dynamic
const dynamic = (numSteps: number) => {

  if (numSteps <= 0) {
    return 1;
  }

  const ways: number[] = [];
  // The position is 1 less than the actual number so keep track of that
  // for 1 step there is only 1 way. For 2 steps there are two ways.
  // You need two numbers to start though because the number of ways for a step
  // is the combination of the two steps before it
  ways[1] = 1;
  ways[2] = 2;

  // Now for every step
  for (let x: number = 3; x <= numSteps; x++) {
    ways[x] = ways[x - 1] + ways[x - 2];
  }
  return ways[numSteps];
}

const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

steps.forEach((numSteps: number) => {
  console.log(`number of steps = ${numSteps}, recursive = ${recursive(numSteps)}, dynamic = ${dynamic(numSteps)}`)
});