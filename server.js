// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const Book = require('./models/book');


// Middleware
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.get('/', (req, res) => {
  res.send('Happy Birthday Ooleshwariii....');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


mongoose
  .connect('mongodb://localhost:27017/node-crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err),);

// POST: Create a new book
app.post('/books', async (req, res) => {
  const { title, author, pages } = req.body;

  try {
    const book = new Book({ title, author, pages });
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// GET: Retrieve all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET: Retrieve a book by ID
app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).send('Book not found');
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// PUT: Update a book by ID
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, pages } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, pages },
      { new: true, runValidators: true }
    );
    if (!updatedBook) return res.status(404).send('Book not found');
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
// DELETE: Remove a book by ID
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) return res.status(404).send('Book not found');
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

