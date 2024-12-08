package library.problem;

import java.util.*;

public class Library {
    private HashMap<Integer, Member> members;
    private HashMap<String, Book> books;

    public Library() {
        this.members = new HashMap<>();
        this.books = new HashMap<>();
    }

    public void addBook(String title, String author, String isbn, int copies) {
        if (this.books.containsKey(isbn)) {
            Book book = this.books.get(isbn);
            book.addCopies(copies);
        } else {
            Book book = new Book(title, author, isbn, copies);
            this.books.put(isbn, book);
        }
    }

    public void addMember(Integer id, String name) throws Exception {
        if (this.members.containsKey(id)) {
            throw new Exception("Member already exists");
        }
        this.members.put(id, new Member(id, name));
    }

    public String borrowBook(Integer memberId, String isbn) throws Exception{
        // Check if book exists
        if (!this.books.containsKey(isbn)) {
            throw new Exception("The book "+isbn+" does not exist in this library");
        }

        // Check if the member exists
        if (!this.members.containsKey(memberId)) {
            throw new Exception("The member "+memberId+" does not exist");
        }

        Book book = this.books.get(isbn);
        // check book available
        if (book.getAvailableCopies() == 0) {
            return "Book not available.";
        }

        Member member = this.members.get(memberId);
        // check if member already borrowing book
        if (member.isBorrowingBook(isbn)) {
            return "Already borrowed.";
        }

        // borrow the book
        book.borrowCopy(memberId);
        member.addBookBorrowed(isbn);

        return "Borrow Successful";
    }

    public String returnBook(Integer memberId, String isbn) throws Exception {
        // Check if book exists
        if (!this.books.containsKey(isbn)) {
            throw new Exception("The book "+isbn+" does not exist in this library");
        }

        // Check if the member exists
        if (!this.members.containsKey(memberId)) {
            throw new Exception("The member "+memberId+" does not exist");
        }

        // check if member has borrowed the book
        Member member = this.members.get(memberId);
        if (!member.isBorrowingBook(isbn)) {
            return "Invalid return request.";
        }

        // check if the library already has all the copies of the book
        Book book = this.books.get(isbn);
        if (book.getAvailableCopies() == book.getTotalCopies()) {
            return "The library already has all it's copies of that book";
        }

        // return the book;
        book.returnCopy(memberId);
        member.removeBookBorrowed(isbn);

        return "Return successful";
    }

    public List<Book> getTopBooksBorrowed(int numTop) {
        List<Book> books = new ArrayList<Book>(this.books.values());
        books.sort(Comparator.comparingInt(Book::getTimesBorrowed).reversed().thenComparing(Book::getTitle));
        return books.subList(0, Math.min(books.size(), numTop));
    }

    public List<Member> getTopBorrowers(int numTop) {
        List<Member> members = new ArrayList<>(this.members.values());
        members.sort(Comparator.comparingInt(Member::getNumberTimesBorrowing).reversed().thenComparing(Member::getName));
        return members.subList(0, Math.min(members.size(), numTop));
    }

    @Override
    public String toString() {
        return "Library{" +
                "members=" + members +
                ", books=" + books +
                '}';
    }
}
