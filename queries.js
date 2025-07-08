//TASK 2
db.books.insertMany([
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    published_year: 2008,
    price: 30,
    in_stock: true,
    pages: 464,
    publisher: "Prentice Hall",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    genre: "Software Engineering",
    published_year: 1999,
    price: 25,
    in_stock: false,
    pages: 352,
    publisher: "Addison-Wesley",
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    genre: "JavaScript",
    published_year: 2015,
    price: 20,
    in_stock: true,
    pages: 278,
    publisher: "O'Reilly Media",
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    genre: "JavaScript",
    published_year: 2018,
    price: 22,
    in_stock: true,
    pages: 472,
    publisher: "No Starch Press",
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    genre: "Software Engineering",
    published_year: 1999,
    price: 28,
    in_stock: true,
    pages: 448,
    publisher: "Addison-Wesley",
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    genre: "JavaScript",
    published_year: 2008,
    price: 18,
    in_stock: true,
    pages: 176,
    publisher: "O'Reilly Media",
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma",
    genre: "Programming",
    published_year: 1994,
    price: 35,
    in_stock: false,
    pages: 395,
    publisher: "Addison-Wesley",
  },
  {
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    genre: "Interview Prep",
    published_year: 2015,
    price: 40,
    in_stock: true,
    pages: 687,
    publisher: "CareerCup",
  },
  {
    title: "Code Complete",
    author: "Steve McConnell",
    genre: "Programming",
    published_year: 2004,
    price: 38,
    in_stock: true,
    pages: 960,
    publisher: "Microsoft Press",
  },
  {
    title: "The Art of Computer Programming",
    author: "Donald Knuth",
    genre: "Computer Science",
    published_year: 1968,
    price: 50,
    in_stock: false,
    pages: 672,
    publisher: "Addison-Wesley",
  },
]);

//Write MongoDB queries to:
// CRUD Operations

// 1. Find all books in a specific genre
db.books.find({ genre: "JavaScript" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } });

// 3. Find books by a specific author
db.books.find({ author: "Robert C. Martin" });

// 4. Update the price of a specific book
db.books.updateOne({ title: "Refactoring" }, { $set: { price: 32 } });

// 5. Delete a book by its title
db.books.deleteOne({ title: "The Pragmatic Programmer" });

// Advanced Queries

// 6. Books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7. Projection: return only title, author, and price
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 });

// 8. Sort books by price ascending
db.books.find().sort({ price: 1 });

// 9. Sort books by price descending
db.books.find().sort({ price: -1 });

// 10. Pagination: First 5 books (Page 1)
db.books.find().limit(5);

// 11. Pagination: Skip first 5 books (Page 2)
db.books.find().skip(5).limit(5);

// Aggregation Pipelines

// 12. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } },
]);

// 13. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 },
]);

// 14. Group books by publication decade and count
db.books.aggregate([
  {
    $project: {
      decade: { $concat: [{ $substr: ["$published_year", 0, 3] }, "0s"] },
    },
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } },
]);

// Indexing

// 15. Create an index on title
db.books.createIndex({ title: 1 });

// 16. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 17. Use explain to analyze query with index
db.books.find({ title: "Clean Code" }).explain("executionStats");
