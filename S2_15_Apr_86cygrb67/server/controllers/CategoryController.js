
const Post = require("../models/Post");
const Category = require("../models/Category");

const createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
      const category = new Category({ name, description });
      await category.save();
      res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create category', error });
    }
  };

const deleteCategory = async (req, res) => {
  try {
    const isCategoryInUse = await Post.findOne({ category: req.params.id });
    if (isCategoryInUse) {
      return res.status(400).json({ message: "Cannot delete: Category is in use." });
    }
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { createCategory };