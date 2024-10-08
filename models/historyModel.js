const db = require('../config/db');

const logHistory = async (userId, bookId, action) => {
    const borrowDate = action === 'BORROWED' ? new Date() : null;
    const returnDate = action === 'RETURNED' ? new Date() : null;
    const [result] = await db.execute(
        'INSERT INTO history (user_id, book_id, borrow_date, return_date) VALUES (?, ?, ?, ?)',
        [userId, bookId, borrowDate, returnDate]
    );
    return result;
};

const getMemberHistory = async (userId) => {
    const [rows] = await db.execute('SELECT * FROM history WHERE user_id = ?', [userId]);
    return rows;
};



const getBorrowHistory = async (userId) => {
    const query = `
        SELECT 
            h.book_id, h.borrow_date, h.return_date, 
            b.title AS book_title, b.author AS book_author
        FROM history h
        JOIN books b ON h.book_id = b.id
        WHERE h.user_id = ?
        ORDER BY h.borrow_date DESC`; // Orders the history by borrow date (latest first)

    const [rows] = await db.execute(query, [userId]);
    return rows;
};

module.exports = { logHistory, getMemberHistory, getBorrowHistory };
