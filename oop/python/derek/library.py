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

class Book:
  def __init__(self, isbn: str, title: str):
    self.isbn = isbn
    self.title = title
    self.total_copies = 0
    self.available_copies = 0
    self.times_borrowed = 0

  def add_copies(self, num_copies: int):
    self.total_copies += num_copies
    self.available_copies += num_copies

  def remove_copies(self, num_copies: int):
    if (self.available_copies < num_copies):
      raise Exception(f"Cannot remove {num_copies} copies of {self.title} beacuse only {self.available_copies} are available")
    self.available_copies -= num_copies
    self.total_copies -= num_copies

  def borrow_book(self):
    if (self.available_copies == 0):
      raise Exception(f"The book {self.title} cannot be borrowed because there are NO available copies")
    self.available_copies -= 1
    self.times_borrowed += 1
    
  def return_book(self):
    if (self.available_copies == self.total_copies):
      raise Exception(f"You cannot return a copy of {self.title} here because we already have all our copies")
    self.available_copies += 1

  def __repr__(self) -> str:
    return f"{{title: {self.title}, copies: {self.total_copies}, available: {self.available_copies}, times_borrowed: {self.times_borrowed}}}"

class Library:
  def __init__(self):
    self.books = {}

  def add_book(self, isbn: str, title: str, num_copies: int):
    if (isbn not in self.books):
      self.books[isbn] = Book(isbn, title)
    self.books[isbn].add_copies(num_copies)

  def remove_book(self, isbn: str, num_copies: int):
    if (isbn not in self.books):
      raise Exception(f"The book with the isbn {isbn} does not exist")
    # Remove copies in the Book class checks that enough copies are available OR it throws an error
    self.books[isbn].remove_copies(num_copies)

  def borrow_book(self, isbn: str): 
    if (isbn not in self.books):
      raise Exception(f"The book with the isbn {isbn} does not exist")
    self.books[isbn].borrow_book()

  def return_book(self, isbn: str):
    if (isbn not in self.books):
      raise Exception(f"We do not own any books with the isbn {isbn} here, please shoo")
    self.books[isbn].return_book()
    
  def top_books(self, n: int):
    return sorted(self.books.values(), key= lambda book: (-book.times_borrowed, book.title))[:n]
  
  def __repr__(self):
    library_info = [
      {isbn: book}
      for isbn, book in self.books.items()
    ]
    return str(library_info)

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

library = Library()

if __name__ == "__main__":
  for index, input in enumerate(inputs):
    try:
      if input[0] == "ADD_BOOK":
        library.add_book(input[1], input[2], input[3])
      elif input[0] == "REMOVE_BOOK":
        library.remove_book(input[1], input[2])
      elif input[0] == "BORROW_BOOK":
        library.borrow_book(input[1])
      elif input[0] == "RETURN_BOOK":
        library.return_book(input[1])
      elif input[0] == "TOP_BORROWED_BOOKS":
        top_books = library.top_books(input[1])
        print(top_books)
    except Exception as e:
      print(e)

print(library)