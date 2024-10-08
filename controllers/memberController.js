const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();



const { createUser, updateUserStatus, listUsers, findUserById, deleteUser } = require('../models/userModel');
const { getMemberHistory, getBorrowHistory } = require('../models/historyModel');

const addMember = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await createUser(username, hashedPassword, 'MEMBER');
        res.status(201).json({ message: 'Member added', memberId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: 'Error adding member', error: err.message });
    }
};

const updateMemberStatus = async (req, res) => {
    const { memberId } = req.params;
    const { status, username, password } = req.body;
    console.log(req.body, "body");
    try {
        let data = await updateUserStatus(memberId, status, username, password);
        console.log(data, "data");

        res.status(200).json({ message: `Member status updated to ${status}` });
    } catch (err) {
        res.status(500).json({ message: 'Error updating member', error: err.message });
    }
};

const listMembers = async (req, res) => {
    try {
        const users = await listUsers();
        res.status(200).json(users.reverse());
    } catch (err) {
        res.status(500).json({ message: 'Error fetching members', error: err.message });
    }
};

const viewMemberHistory = async (req, res) => {
    const { memberId } = req.params;
    try {
        const history = await getMemberHistory(memberId);
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching member history', error: err.message });
    }
};


const viewBorrowHistory = async (req, res) => {

    try {
        const history = await getBorrowHistory(req.user.userId);
        // console.log(history);
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching member history', error: err.message });
    }
};


const deleteMember = async (req, res) => {
    const { memberId } = req.params;

    try {
        await deleteUser(memberId);
        res.status(200).json({ message: `Member deleted successfully!` });
    } catch (err) {
        res.status(500).json({ message: 'Error updating member', error: err.message });
    }
};


const deleteAccount = async (req, res) => {
    const { userId } = req.user;
    console.log(req.user, "user");

    try {
        await deleteUser(userId);
        res.status(200).json({ message: `Account deleted successfully!` });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting account', error: err.message });
    }
};


module.exports = { addMember, updateMemberStatus, listMembers, viewMemberHistory, deleteMember, viewBorrowHistory, deleteAccount };
