const db = require('../config/db');

const createUser = async (username, password, role) => {
    const [result] = await db.execute(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, password, role]
    );
    return result;
};

const findUserByUsername = async (username) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
};

const updateUserStatus = async (id, status, username, password) => {
    const [result] = await db.execute('UPDATE users SET status = ?, username = ?, password = ? WHERE id = ?', [status, username, password, id]);
    return result;
};

const listUsers = async () => {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
};


const deleteUser = async (id) => {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    return result;
};

module.exports = { createUser, findUserByUsername, updateUserStatus, listUsers, deleteUser };
