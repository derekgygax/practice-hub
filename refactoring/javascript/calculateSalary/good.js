
// can be redone in many ways

function calculateTotalSalary(employees) {

  const totalSalary = employees.reduce((total, employee) => {
    return total + (employee.role === "Manager" ? employee.salary * 1.1 : employee.salary);
  }, 0);

  // for (let i = 0; i < employees.length; i++) {
  //   if (employees[i].role === "Manager") {
  //     totalSalary += employees[i].salary * 1.1;
  //   } else {
  //     totalSalary += employees[i].salary;
  //   }
  // }
  // let totalSalary = 0;
  // for (const employee of employees) {
  //   totalSalary += (employee.role === "Manager" ? employee.salary * 1.1 : employee.salary);
  // }

  return `Total Payroll: $${totalSalary}`;
}

// Test Cases
const employees = [
  { name: "Alice", role: "Developer", salary: 5000 },
  { name: "Bob", role: "Manager", salary: 7000 },
  { name: "Charlie", role: "Developer", salary: 5500 },
  { name: "Diana", role: "Manager", salary: 7200 }
];

console.log(calculateTotalSalary(employees));
