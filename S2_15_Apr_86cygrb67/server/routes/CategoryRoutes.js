
const express = require('express');
const Category = require('../models/Category');
const { protect, authorizeRoles} = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new category
router.post('/', protect, authorizeRoles('Admin'), async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing category
router.put('/:id', protect, authorizeRoles('Admin'), async (req, res) => {
  const { name, description } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a category
router.delete('/:id', protect, authorizeRoles('Admin'), async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    const posts = await Post.find({ category: req.params.id });
    if (posts.length > 0) {
      return res.status(400).json({ message: 'Cannot delete category. It is in use by posts.' });
    }

    await category.remove();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
