package library.problem;

import java.util.HashSet;

public class Book {
    private String title;
    private String author;
    private String isbn;
    private int availableCopies;
    private int totalCopies;
    private int timesBorrowed;
    private HashSet<Integer> borrowers;

    public Book(String title, String author, String isbn, int copies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.availableCopies = copies;
        this.totalCopies = copies;
        this.timesBorrowed = 0;
        this.borrowers = new HashSet<>();
    }

    public void addCopies(int numCopies) {
        this.totalCopies += numCopies;
        this.availableCopies += numCopies;
    }

    public void borrowCopy(Integer memberId) {
        this.availableCopies--;
        this.timesBorrowed++;
        this.borrowers.add(memberId);
    }

    public void returnCopy(Integer memberId) {
        this.availableCopies++;
        this.borrowers.remove(memberId);
    }

    public int getAvailableCopies() {
        return availableCopies;
    }

    public void setAvailableCopies(int availableCopies) {
        this.availableCopies = availableCopies;
    }

    public int getTotalCopies() {
        return totalCopies;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public int getTimesBorrowed() {
        return timesBorrowed;
    }

    @Override
    public String toString() {
        return "Book{" +
                "title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", isbn='" + isbn + '\'' +
                ", availableCopies=" + availableCopies +
                ", totalCopies=" + totalCopies +
                ", timesBorrowed=" + timesBorrowed +
                ", borrowers=" + borrowers +
                '}';
    }
}
