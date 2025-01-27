package com.example.demo.student;


import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class StudentConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> {
           Student derek =  new Student(
                    "Derek",
                    LocalDate.of(1988, Month.FEBRUARY, 23),
                    "derekcrapper@gmail.com"
            );
           Student alex =  new Student(
                   "Alex",
                   LocalDate.of(1995, Month.FEBRUARY, 23),
                   "alexcrapper@gmail.com"
           );

           repository.saveAll(
                   List.of(derek, alex)
           );
        };
    }
}
