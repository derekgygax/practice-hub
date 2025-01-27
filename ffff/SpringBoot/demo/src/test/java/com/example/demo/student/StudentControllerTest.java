package com.example.demo.student;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.Month;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(StudentController.class)
class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentService studentService;

    @Test
    void canRegisterNewStudent() throws Exception {
        Student student = new Student(
                "Derek",
                LocalDate.of(1988, Month.FEBRUARY, 23),
                "derekcrapper@gmail.com"
        );

        mockMvc.perform(post("/api/v1/student")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(student)))
                .andExpect(status().isOk());
    }

    @Test
    void canGetStudents() throws Exception {
        mockMvc.perform(get("/api/v1/student"))
                .andExpect(status().isOk());
    }

    @Test
    void canDeleteStudent() throws Exception {
        mockMvc.perform(delete("/api/v1/student/{studentId}", 1L))
                .andExpect(status().isOk());
    }
}
