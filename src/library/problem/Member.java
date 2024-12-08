package library.problem;

import java.util.HashSet;

public class Member {

    private String name;
    private Integer id;
    private int numberTimesBorrowing;
    private HashSet<String> booksBorrowed;

    public Member(Integer id, String name) {
        this.name = name;
        this.id = id;
        this.numberTimesBorrowing = 0;
        this.booksBorrowed = new HashSet<>();
    }

    public void addBookBorrowed(String bookIsbn) {
        this.booksBorrowed.add(bookIsbn);
        this.numberTimesBorrowing++;
    }

    public void removeBookBorrowed(String bookIsbn) {
        this.booksBorrowed.remove(bookIsbn);
    }

    public boolean isBorrowingBook(String bookIsbn) {
        return this.booksBorrowed.contains(bookIsbn);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNumberTimesBorrowing() {
        return numberTimesBorrowing;
    }

    @Override
    public String toString() {
        return "Member{" +
                "name='" + name + '\'' +
                ", id=" + id +
                ", numberTimesBorrowing=" + numberTimesBorrowing +
                ", booksBorrowed=" + booksBorrowed +
                '}';
    }
}
