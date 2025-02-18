function processStudents(students) {
  let passedStudents = [];
  let failedStudents = [];

  students.forEach(student => {
    let totalScore = student.scores.reduce((total, score) => {
      return total + score;
    }, 0);

    student.average = totalScore / student.scores.length;

    const { scores, ...studentSummary } = student;

    if (studentSummary.average >= 60) {
      passedStudents.push(studentSummary);
    } else {
      failedStudents.push(studentSummary);
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
