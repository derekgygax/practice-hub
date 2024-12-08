package library.problem;


//Actions:
//        1. Borrow:
//Input: Membership ID: 1, ISBN: "123"
//Output: "Borrow successful."
//Result: Available copies of "123" = 2.
//
//        2. Borrow:
//Input: Membership ID: 2, ISBN: "123"
//Output: "Borrow successful."
//Result: Available copies of "123" = 1.
//
//        3. Borrow:
//Input: Membership ID: 1, ISBN: "123"
//Output: "Already borrowed."
//
//        4. Return:
//Input: Membership ID: 2, ISBN: "123"
//Output: "Return successful."
//Result: Available copies of "123" = 2.
//
//        5. Return:
//Input: Membership ID: 1, ISBN: "456"
//Output: "Invalid return request."

import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        Library library = new Library();

        try {
            // Add books
            library.addBook("The Great Gatsby", "F. Scott Fitzgerald", "123", 3);
            library.addBook("1984", "George Orwell", "456", 2);
            library.addBook("To Kill a Mockingbird", "Harper Lee", "789", 4);
            library.addBook("Moby Dick", "Herman Melville", "321", 5);
            library.addBook("Pride and Prejudice", "Jane Austen", "654", 3);
            library.addBook("The Catcher in the Rye", "J.D. Salinger", "987", 2);
            library.addBook("War and Peace", "Leo Tolstoy", "741", 6);
            library.addBook("The Hobbit", "J.R.R. Tolkien", "852", 4);
            library.addBook("Crime and Punishment", "Fyodor Dostoevsky", "963", 3);
            library.addBook("The Odyssey", "Homer", "159", 5);


            // Add members
            library.addMember(1, "Alice");
            library.addMember(2, "Bob");
            library.addMember(3, "Charlie");
            library.addMember(4, "Diana");
            library.addMember(5, "Eve");
            library.addMember(6, "Frank");
            library.addMember(7, "Grace");
            library.addMember(8, "Hank");
            library.addMember(9, "Ivy");
            library.addMember(10, "Jack");


            // Borrow
            String[][] borrows = {
                    {"1", "123"},
                    {"2", "123"},
                    {"1", "123"},

                    // Successful borrows
                    {"1", "123"},
                    {"2", "123"},
                    {"3", "456"},
                    {"4", "789"},
                    {"1", "789"},
                    {"2", "456"},
                    {"3", "123"},

                    // Error cases
                    {"1", "123"}, // Already borrowed by member 1
                    {"5", "111"}, // Book not available in library
                    {"6", "789"}, // Already borrowed all copies
                    {"1", "789"}, // Already borrowed by member 1
                    {"7", "000"}, // Non-existent book ISBN
                    {"2", "456"}, // Already borrowed by member 2
            };

            for (String[] input: borrows) {
                try {
                        String borrowMessage = library.borrowBook(Integer.parseInt(input[0]), input[1]);
                        System.out.println(borrowMessage);
                } catch (Exception err) {
                    System.err.println(err.getMessage());
                }
            }

            // Return
            String[][] returns = {
                    {"2", "123"},
                    {"1", "456"},

                    // Successful returns
                    {"1", "123"},
                    {"2", "123"},
                    {"3", "456"},
                    {"4", "789"},
                    {"1", "789"},

                    // Error cases
                    {"5", "123"}, // Member 5 never borrowed this book
                    {"6", "456"}, // Book not borrowed by member 6
                    {"1", "000"}, // Non-existent book ISBN
                    {"2", "999"}, // Non-existent book ISBN
                    {"3", "123"}, // Member 3 never borrowed this book
                    {"7", "111"}, // Member 7 never borrowed this book
            };
            for (String[] input: returns) {
                try {
                        String returnMessage = library.returnBook(Integer.parseInt(input[0]), input[1]);
                        System.out.println(returnMessage);
                } catch (Exception err) {
                    System.err.println(err.getMessage());
                }
            }

            // get top borrowed books
            System.out.println(library.getTopBooksBorrowed(3));

            // get the top borrowers
            System.out.println(library.getTopBorrowers(3));

//            System.out.println(library);

        } catch (Exception err) {
            System.err.println(err.getMessage());
        }
    }
}
