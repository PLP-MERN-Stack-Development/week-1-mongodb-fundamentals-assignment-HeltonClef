// 📘 Basic CRUD Queries

// 1. Find all books in a specific genre (e.g., "Fiction")
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year (e.g., after 1950)
db.books.find({ published_year: { $gt: 1950 } });

// 3. Find books by a specific author (e.g., "George Orwell")
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book (e.g., "The Hobbit")
db.books.updateOne({ title: "The Hobbit" }, { $set: { price: 17.99 } });

// 5. Delete a book by its title (e.g., "Moby Dick")
db.books.deleteOne({ title: "Moby Dick" });

// 📊 Advanced Queries

// 6. Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7. Projection: Show only title, author, and price
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 });

// 8. Sort books by price (ascending)
db.books.find().sort({ price: 1 });

// 9. Sort books by price (descending)
db.books.find().sort({ price: -1 });

// 10. Pagination – Page 1: First 5 books
db.books.find().limit(5);

// 11. Pagination – Page 2: Skip 5, limit 5
db.books.find().skip(5).limit(5);

// 🔄 Aggregation Pipelines

// 12. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } },
]);

// 13. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 },
]);

// 14. Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [{ $substr: [{ $toString: "$published_year" }, 0, 3] }, "0s"],
      },
    },
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } },
]);

// ⚡ Indexing & Performance Analysis

// 15. Create an index on the "title" field
db.books.createIndex({ title: 1 });

// 16. Create a compound index on "author" and "published_year"
db.books.createIndex({ author: 1, published_year: 1 });

// 17. Use explain() to show performance improvement
db.books.find({ title: "1984" }).explain("executionStats");
