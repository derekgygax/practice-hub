export { };


// TODO IS THIS RIGHT!!!


/*

Chat GPT made this question. Its pretty good

Library
Add book:
Add a new book to the library with a unique ISBN (International Standard Book Number).
If the book already exists, increase the available quantity.
Remove book:
Remove a book from the library by its ISBN.
If the book does not exist or the quantity to remove exceeds the available quantity, error out.
Borrow book:
Borrow a book by its ISBN.
If the book does not exist or no copies are available, error out.
Return book:
Return a borrowed book by its ISBN.
If the book does not exist in the system, error out.
Find the most borrowed books:
Return the top n books that have been borrowed the most times.
If two books have the same borrow count, return them alphabetically by title.

*/

class Book {

  public isbn: string;
  public title: string;
  public totalCopies: number;
  public availableCopies: number;
  public timesBorrowed: number;

  // Keep the copies here in case they add two copies at once
  constructor(isbn: string, title: string) {
    this.isbn = isbn;
    this.title = title;
    this.totalCopies = 0;
    this.availableCopies = 0;
    this.timesBorrowed = 0;
  }

  addCopies(copies: number) {
    this.availableCopies += copies;
    this.totalCopies += copies;
  }

  removeCopies(copies: number) {
    if (copies > this.availableCopies) {
      throw new Error(`You want to remove ${copies} copies of the book ${this.title} with the isbn ${this.isbn}. But only ${this.availableCopies} are available right now. ${this.totalCopies} copies exist and ${this.totalCopies - this.availableCopies} are being borrowed.`)
    }
    this.totalCopies -= copies;
    this.availableCopies -= copies;
  }

  borrowCopy() {
    if (this.availableCopies === 0) {
      throw new Error(`The book ${this.title} is not available right now.`)
    }
    this.availableCopies -= 1;
    this.timesBorrowed += 1;
  }

  returnCopy() {
    if (this.availableCopies === this.totalCopies) {
      throw new Error(`We already have all our copies of the book ${this.title}. So again, where the fuck did you get it.`)
    }
    this.availableCopies += 1;
  }


}

class Library {

  public books: Map<string, Book>;

  constructor() {
    this.books = new Map<string, Book>();
  }

  addBook(isbn: string, title: string, copies: number) {
    if (!this.books.has(isbn)) {
      this.books.set(isbn, new Book(isbn, title));
    }
    this.books.get(isbn)?.addCopies(copies);
  }

  removeBook(isbn: string, copies: number) {
    if (!this.books.has(isbn)) {
      throw new Error(`Book with isbn ${isbn} does not exist in this Library.`);
    }
    this.books.get(isbn)?.removeCopies(copies);
  }

  borrowBook(isbn: string) {
    if (!this.books.has(isbn)) {
      throw new Error(`You cannot borrow the book ${isbn} because we do NOT have it.`)
    }
    this.books.get(isbn)?.borrowCopy();
  }

  returnBook(isbn: string) {
    if (!this.books.has(isbn)) {
      throw new Error(`We do not seem to have the book with the isbn ${isbn}. IDK where the fuck you got it, but it wasn't us.`);
    }
    this.books.get(isbn)?.returnCopy();
  }

  mostBorrowedBooks(n: number): Book[] {
    return Array.from(this.books.values()).sort((a, b) => {
      if (a.timesBorrowed === b.timesBorrowed) {
        return a.title.localeCompare(b.title);
      }
      return (b.timesBorrowed - a.timesBorrowed)
    }).slice(0, n);
  }

  toString() {
    const arr: string[] = []
    for (const [key, value] of this.books) {
      arr.push(key);
    }

    return arr;
  }
}


const inputs: (string | number)[][] = [
  ["ADD_BOOK", "978-3-16-148410-0", "Book1", 5],
  ["ADD_BOOK", "978-0-13-110163-0", "Book2", 3],
  ["BORROW_BOOK", "978-3-16-148410-0"],
  ["BORROW_BOOK", "978-3-16-148410-0"],
  ["BORROW_BOOK", "978-0-13-110163-0"],
  ["RETURN_BOOK", "978-3-16-148410-0"],
  ["BORROW_BOOK", "978-3-16-148410-0"],
  ["REMOVE_BOOK", "978-3-16-148410-0", 1],
  ["ADD_BOOK", "978-3-16-148410-0", "Book1", 2],
  ["REMOVE_BOOK", "978-0-13-110163-0", 4],  // Error: quantity exceeds available
  ["REMOVE_BOOK", "978-0-13-110163-0", 2],
  ["BORROW_BOOK", "978-3-16-148410-0"],
  ["BORROW_BOOK", "978-3-16-148410-0"],  // Error: no copies available. 
  ["ADD_BOOK", "978-1-61-729413-6", "Book3", 7],
  ["BORROW_BOOK", "978-1-61-729413-6"],
  ["RETURN_BOOK", "978-0-13-115163-0"],  // Error: book not in system
  ["TOP_BORROWED_BOOKS", 3],
  ["ADD_BOOK", "978-1-61-729054-1", "Book4", 10],
  ["BORROW_BOOK", "978-1-61-729054-1"],
  ["BORROW_BOOK", "978-1-61-729413-6"],
  ["BORROW_BOOK", "978-1-61-729054-1"],
  ["RETURN_BOOK", "978-1-61-729413-6"],
  ["BORROW_BOOK", "978-1-61-729413-6"],
  ["TOP_BORROWED_BOOKS", 2],
  ["ADD_BOOK", "978-0-321-35668-0", "Book5", 4],
  ["BORROW_BOOK", "978-0-321-35668-0"],
  ["REMOVE_BOOK", "978-1-61-729413-6", 3],
  ["BORROW_BOOK", "978-0-321-35668-0"],
  ["RETURN_BOOK", "978-0-321-35668-0"],
  ["TOP_BORROWED_BOOKS", 5],
  ["ADD_BOOK", "978-0-07-013151-4", "Book6", 6],
  ["BORROW_BOOK", "978-0-07-013151-4"],
  ["RETURN_BOOK", "978-0-07-013151-4"],
  ["BORROW_BOOK", "978-0-07-013151-4"],
  ["REMOVE_BOOK", "978-0-07-013151-4", 5],  // Error: quantity exceeds available
  ["REMOVE_BOOK", "978-0-07-013151-4", 1],
  ["TOP_BORROWED_BOOKS", 4],
  ["BORROW_BOOK", "978-1-61-729413-6"],
  ["ADD_BOOK", "978-0-201-48558-2", "Book7", 8],
  ["BORROW_BOOK", "978-0-201-48558-2"],
  ["BORROW_BOOK", "978-0-201-48558-2"],
  ["RETURN_BOOK", "978-1-61-729413-6"],
  ["BORROW_BOOK", "978-1-61-729413-6"],
  ["RETURN_BOOK", "978-0-201-48558-2"],
  ["BORROW_BOOK", "978-0-201-48558-2"],
  ["TOP_BORROWED_BOOKS", 3]
];

const library = new Library();

inputs.forEach((input: (string | number)[], index: number) => {
  try {
    if (input[0] === "ADD_BOOK") {
      library.addBook(input[1] as string, input[2] as string, input[3] as number);
    } else if (input[0] === "REMOVE_BOOK") {
      library.removeBook(input[1] as string, input[2] as number);
    } else if (input[0] === "BORROW_BOOK") {
      library.borrowBook(input[1] as string);
    } else if (input[0] === "RETURN_BOOK") {
      library.returnBook(input[1] as string);
    } else if (input[0] === "TOP_BORROWED_BOOKS") {
      const booksMostBorrowed = library.mostBorrowedBooks(input[1] as number);
      // console.log(`${input[1] as number} mostBorrowed: `, booksMostBorrowed);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message, input, index);
    } else {
      console.error(err);
    }
  }
})
// console.log(library.toString());