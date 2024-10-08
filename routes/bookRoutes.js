const express = require('express');
const { addBook, updateBookDetails, deleteBookById, borrowBook, returnBook, viewAvailableBooks, viewBooks } = require('../controllers/bookController');
const { authenticateJWT, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

router.post('/add', authenticateJWT, authorizeRoles('LIBRARIAN'), addBook);
router.put('/update/:bookId', authenticateJWT, authorizeRoles('LIBRARIAN'), updateBookDetails);
router.delete('/delete/:bookId', authenticateJWT, authorizeRoles('LIBRARIAN'), deleteBookById);
router.post('/borrow/:bookId', authenticateJWT, authorizeRoles('MEMBER'), borrowBook);
router.post('/return/:bookId', authenticateJWT, authorizeRoles('MEMBER'), returnBook);
router.get('/available', authenticateJWT, viewAvailableBooks);
router.get('/viewbooks', authenticateJWT, viewBooks);


module.exports = router;
