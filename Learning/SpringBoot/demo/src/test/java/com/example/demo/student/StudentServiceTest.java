package com.example.demo.student;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.Month;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class StudentServiceTest {

    private AutoCloseable closeable; // Declare AutoCloseable for cleanup

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() throws Exception {
        // Close mocks to clean up resources
        closeable.close();
    }

    @Test
    void canGetStudents() {
        studentService.getStudents();
        verify(studentRepository).findAll();
    }

    @Test
    void canAddNewStudent() {
        Student student = new Student(
                "Derek",
                LocalDate.of(1988, Month.FEBRUARY, 23),
                "derekcrapper@gmail.com"
        );
        studentService.addNewStudent(student);
        verify(studentRepository).save(student);
    }

    @Test
    void throwsExceptionWhenEmailIsTaken() {
        Student student = new Student(
                "Derek",
                LocalDate.of(1988, Month.FEBRUARY, 23),
                "derekcrapper@gmail.com"
        );

        when(studentRepository.findStudentByEmail(student.getEmail()))
                .thenReturn(Optional.of(student));

        assertThrows(IllegalStateException.class, () -> studentService.addNewStudent(student));
    }
}
