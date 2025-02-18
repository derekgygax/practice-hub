function processStudents(students) {
  let passedStudents = [];
  let failedStudents = [];

  students.forEach(student => {
    let totalScore = 0;
    for (let i = 0; i < student.scores.length; i++) {
      totalScore += student.scores[i];
    }

    let average = totalScore / student.scores.length;
    student.average = average;

    if (average >= 60) {
      passedStudents.push({ name: student.name, average });
    } else {
      failedStudents.push({ name: student.name, average });
    }
  });

  return {
    passed: passedStudents,
    failed: failedStudents
  };
}

// Test Cases
const students = [
  { name: "Alice", scores: [70, 85, 90] },
  { name: "Bob", scores: [40, 55, 50] },
  { name: "Charlie", scores: [80, 75, 85] },
  { name: "Diana", scores: [30, 40, 35] }
];

console.log(processStudents(students));
