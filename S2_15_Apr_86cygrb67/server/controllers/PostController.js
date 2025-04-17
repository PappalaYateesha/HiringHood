const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { title, content, category, status, tags } = req.body;
    const image = req.file ? req.file.filename : null;

    const parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);

    const newPost = new Post({
      title,
      content,
      category,
      status,
      tags: parsedTags,
      image,
      author: req.user._id,
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('❌ Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

const updatePost = async (req, res) => {
  const { title, content, category, status, tags } = req.body;
  try {
    let image = req.body.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);

    const postToUpdate = await Post.findById(req.params.id);

    if (!postToUpdate) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (req.user.role !== 'Admin' && postToUpdate.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to edit this post' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category, status, tags: parsedTags, image, updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const postToDelete = await Post.findById(req.params.id);

    if (!postToDelete) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (req.user.role !== 'Admin' && postToDelete.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }

    await postToDelete.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting post' });
  }
};


const getRecentPosts = async (req, res) => {
  try {
    const recentPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json({ recentPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recent posts' });
  }
};

const getPosts = async (req, res) => {
  const { page = 1, limit = 10, status, author, category } = req.query;
  try {
    const query = {};
    if (status) query.status = status;
    if (author) query.author = author;
    if (category) query.category = category;

    const posts = await Post.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('author', 'name')
      .populate('category', 'name');

    const totalPosts = await Post.countDocuments(query);

    res.json({ posts, totalPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name').populate('category', 'name');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching post' });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getRecentPosts,
  getPosts,
  getPostById
};
