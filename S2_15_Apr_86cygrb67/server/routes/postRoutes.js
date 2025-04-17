const express = require('express');
const multer = require('multer');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const path = require('path');
const postController = require('../controllers/PostController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
router.get('/recent', protect, postController.getRecentPosts);
router.get('/', protect, postController.getPosts);
router.post('/', protect, authorizeRoles('Admin', 'Editor'), upload.single('image'), postController.createPost);
router.put('/:id', protect, authorizeRoles('Admin', 'Editor'), upload.single('image'), postController.updatePost);
router.delete('/:id', protect, authorizeRoles('Admin'), postController.deletePost);
router.get('/:id', protect, postController.getPostById);

module.exports = router;
