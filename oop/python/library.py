"""
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
"""


inputs = [
  ["ADD_BOOK", "978-3-16-148410-0", "Book1", 5],
  ["ADD_BOOK", "978-0-13-110163-0", "Book2", 3],
  ["BORROW_BOOK", "978-3-16-148410-0"],
  ["BORROW_BOOK", "978-3-16-148410-0"],
  ["BORROW_BOOK", "978-0-13-110163-0"],
  ["RETURN_BOOK", "978-3-16-148410-0"],
  ["BORROW_BOOK", "978-3-16-148410-0"],
  ["REMOVE_BOOK", "978-3-16-148410-0", 1],
  ["ADD_BOOK", "978-3-16-148410-0", "Book1", 2],
  ["REMOVE_BOOK", "978-0-13-110163-0", 4],  # Error: quantity exceeds available
  ["REMOVE_BOOK", "978-0-13-110163-0", 2],
  ["BORROW_BOOK", "978-3-16-148410-0"],
  ["BORROW_BOOK", "978-3-16-148410-0"],  # Error: no copies available. 
  ["ADD_BOOK", "978-1-61-729413-6", "Book3", 7],
  ["BORROW_BOOK", "978-1-61-729413-6"],
  ["RETURN_BOOK", "978-0-13-115163-0"],  # Error: book not in system
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
  ["REMOVE_BOOK", "978-0-07-013151-4", 5],  # Error: quantity exceeds available
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
]
