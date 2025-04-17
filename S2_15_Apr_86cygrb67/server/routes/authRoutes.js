
const express = require("express");
const router = express.Router();
const { loginUser, getMe } = require("../controllers/authController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.get("/me", protect, getMe);

// Protected route for Admin
router.get("/admin", protect, authorizeRoles('Admin'), (req, res) => {
  res.send("Admin Route Accessed");
});

// Protected route for Editor
router.get("/editor", protect, authorizeRoles('Editor', 'Admin'), (req, res) => {
  res.send("Editor Route Accessed");
});

module.exports = router;
