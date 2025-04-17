const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
} = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorizeRoles('Admin'));

router.get('/', getAllUsers);
router.patch('/:id/role', updateUserRole);
router.patch('/:id/toggle', toggleUserStatus);

module.exports = router;
