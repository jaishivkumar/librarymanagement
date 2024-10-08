const express = require('express');
const { addMember, updateMemberStatus, listMembers, viewMemberHistory, deleteMember, viewBorrowHistory, deleteAccount } = require('../controllers/memberController');
const { authenticateJWT, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

router.post('/add', authenticateJWT, authorizeRoles('LIBRARIAN'), addMember);
router.put('/update/:memberId', authenticateJWT, authorizeRoles('LIBRARIAN'), updateMemberStatus);
router.delete('/delete/:memberId', authenticateJWT, authorizeRoles('LIBRARIAN'), deleteMember);
router.delete('/delete', authenticateJWT, authorizeRoles('MEMBER'), deleteAccount);
router.get('/list', authenticateJWT, authorizeRoles('LIBRARIAN'), listMembers);
router.get('/history/:memberId', authenticateJWT, authorizeRoles('LIBRARIAN'), viewMemberHistory);
router.get('/history', authenticateJWT, authorizeRoles('MEMBER'), viewBorrowHistory);
module.exports = router;
