package com.example.demo.student;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Get the list of all the students from the table student in the database
    public List<Student> getStudents() {
        return this.studentRepository.findAll();
    }

    public void addNewStudent(Student student) {
        // Check if the email exists
        Optional<Student> studentOptional = this.studentRepository.findStudentByEmail(student.getEmail());
        // Throw exception if email already taken
        if (studentOptional.isPresent()) {
            throw new IllegalStateException("email taken");
        }
        // Save the new student
        this.studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        boolean exists = this.studentRepository.existsById(studentId);
        if (!exists) {
            throw new IllegalStateException("student with id "+studentId+" does not exist");
        }
        this.studentRepository.deleteById(studentId);
    }

    // @Transactional lets you change things in the DB using the model
    // So in this case use the class Student
    // Getting student from the DB you can then use student.setName() or student.setEmail()
    // to change the DB
    // This puts thing in a managed state so you can use it
    @Transactional
    public void updateStudent(Long studentId, String name, String email) {
        // does the student exist
        Student student = this.studentRepository.findById(studentId).orElseThrow(() -> {
            return new IllegalStateException("Student with the id "+studentId+" does not exist");
        });

        // change name
        if (name != null
                && !name.isEmpty()
                && !Objects.equals(student.getName(), name)) {
            student.setName(name);
        }

        // change email
        if (email != null
                && !email.isEmpty()
                && !Objects.equals(student.getEmail(), email)) {

            // Check if the email has been taken
            Optional<Student> studentOptional = this.studentRepository.findStudentByEmail(email);
            if (studentOptional.isPresent()) {
                throw new IllegalStateException("email taken");
            }
            // Set the new email
            student.setEmail(email);
        }
    }
}
