package school.models;

import java.util.ArrayList;

public class Class {
    // Putting final here
    private final ArrayList<Student> students;

    public Class() {
        this.students = new ArrayList<Student>();
    }

    public void addStudent(Student student) {
        this.students.add((student));
    }

    public void removeStudent(Student student) {
        this.students.remove(student);
    }

    public ArrayList<Student> getStudents() {
        return this.students;
    }
}
