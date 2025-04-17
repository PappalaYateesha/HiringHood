
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Category = require("../models/Category");
const User = require("../models/User");

router.get("/total-posts", async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    res.json({ totalPosts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total posts" });
  }
});

router.get("/total-categories", async (req, res) => {
  try {
    const totalCategories = await Category.countDocuments();
    res.json({ totalCategories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total categories" });
  }
});

router.get("/total-users", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total users" });
  }
});

module.exports = router;
