const db = require('../config/db');

const createBook = async (title, author) => {
    const [result] = await db.execute('INSERT INTO books (title, author) VALUES (?, ?)', [title, author]);
    return result;
};

const updateBook = async (id, title, author) => {
    const [result] = await db.execute('UPDATE books SET title = ?, author = ? WHERE id = ?', [title, author, id]);
    return result;
};

const deleteBook = async (id) => {
    const [result] = await db.execute('DELETE FROM books WHERE id = ?', [id]);
    return result;
};

const findBookById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
};

const listBooks = async (status) => {
    const [rows] = await db.execute('SELECT * FROM books WHERE status = ?', [status]);
    return rows;
};

const allBooks = async () => {
    const [rows] = await db.execute('SELECT * FROM books');
    return rows;
};

const changeBookStatus = async (id, status) => {
    const [result] = await db.execute('UPDATE books SET status = ? WHERE id = ?', [status, id]);
    return result;
};

module.exports = { createBook, updateBook, deleteBook, findBookById, listBooks, changeBookStatus, allBooks };
