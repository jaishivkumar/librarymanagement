const { createBook, updateBook, deleteBook, findBookById, listBooks, changeBookStatus, allBooks } = require('../models/bookModel');
const { logHistory, getMemberHistory } = require('../models/historyModel');

const addBook = async (req, res) => {
    const { title, author } = req.body;
    try {
        const result = await createBook(title, author);
        res.status(201).json({ message: 'Book added', bookId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: 'Error adding book', error: err.message });
    }
};

const updateBookDetails = async (req, res) => {
    const { bookId } = req.params;
    const { title, author } = req.body;
    try {
        await updateBook(bookId, title, author);
        res.status(200).json({ message: 'Book updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating book', error: err.message });
    }
};

const deleteBookById = async (req, res) => {
    const { bookId } = req.params;
    try {
        await deleteBook(bookId);
        res.status(200).json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book', error: err.message });
    }
};

const borrowBook = async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user.userId;
    try {
        const book = await findBookById(bookId);
        if (book.status === 'BORROWED') return res.status(400).json({ message: 'Book already borrowed' });
        await changeBookStatus(bookId, 'BORROWED');
        await logHistory(userId, bookId, 'BORROWED');
        res.status(200).json({ message: 'Book borrowed' });
    } catch (err) {
        res.status(500).json({ message: 'Error borrowing book', error: err.message });
    }
};

const returnBook = async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user.userId;
    try {
        const book = await findBookById(bookId);
        if (book.status === 'AVAILABLE') return res.status(400).json({ message: 'Book is already available' });
        await changeBookStatus(bookId, 'AVAILABLE');
        await logHistory(userId, bookId, 'RETURNED');
        res.status(200).json({ message: 'Book returned' });
    } catch (err) {
        res.status(500).json({ message: 'Error returning book', error: err.message });
    }
};

const viewAvailableBooks = async (req, res) => {
    try {
        const books = await listBooks('AVAILABLE');
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
};


const viewBooks = async (req, res) => {
    try {
        const books = await allBooks();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
};

module.exports = { addBook, updateBookDetails, deleteBookById, borrowBook, returnBook, viewAvailableBooks, viewBooks };
