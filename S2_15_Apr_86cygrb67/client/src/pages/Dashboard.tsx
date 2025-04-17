import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PostList from "./PostList";
import { RoleBasedRoute } from "./RoleBasedRoute";
import { useAppDispatch } from "../redux/hooks";
import { clearUser } from "../redux/slices/authSlice";
import TopBar from "./topbar";
import { People, Article, Category, Edit } from "@mui/icons-material";
const Dashboard = () => {
  const [totalPosts, setTotalPosts] = useState<number | null>(null);
  const [totalCategories, setTotalCategories] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  

const ToolCard = ({
  label,
  to,
  icon,
  variant = "contained",
  color = "primary",
}: {
  label: string;
  to: string;
  icon: React.ReactNode;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
}) => (
  <Paper
    elevation={4}
    sx={{
      p: 2,
      borderRadius: 4,
      minWidth: "180px",
      flex: "1 1 200px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
      backgroundColor: "#f3f4f6",
      ":hover": {
        backgroundColor: "#e0e7ff",
      },
    }}
  >
    <Typography fontWeight={600}>{label}</Typography>
    <Button
      variant={variant}
      color={color}
      component={Link}
      to={to}
      sx={{ minWidth: 40, p: 1 }}
    >
      {icon}
    </Button>
  </Paper>
);

 const AdminTools = () => (
  <Box mb={5}>
    <Typography variant="h5" fontWeight={700} mb={2}>
      🛠️ Admin Tools
    </Typography>
    <Box display="flex" flexWrap="wrap" gap={2}>
      <ToolCard label="Manage Users" to="/users" icon={<People />} />
      <ToolCard label="Manage Posts" to="/posts" icon={<Article />} />
      <ToolCard label="Manage Categories" to="/categories" icon={<Category />} />
    </Box>
  </Box>
);

 const EditorTools = () => (
  <Box mb={5}>
    <Typography variant="h5" fontWeight={700} mb={2}>
      ✏️ Editor Tools
    </Typography>
    <Box display="flex" flexWrap="wrap" gap={2}>
      <ToolCard label="Edit Posts" to="/posts" icon={<Edit />} variant="outlined" color="secondary" />
      <ToolCard label="Edit Categories" to="/categories" icon={<Category />} variant="outlined" color="secondary" />
    </Box>
  </Box>
);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwt_decode<{ role: string }>(token);
          setUserRole(decodedToken.role);
        } catch (error) {
          console.error("Error decoding token", error);
        }
      }

      try {
        const [postsRes, categoriesRes, usersRes, recentPostsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/stats/total-posts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/stats/total-categories", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/stats/total-users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/posts/recent", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTotalPosts(postsRes.data.totalPosts);
        setTotalCategories(categoriesRes.data.totalCategories);
        setTotalUsers(usersRes.data.totalUsers);
        setRecentPosts(recentPostsRes.data.recentPosts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    
    <Box sx={{ p: 4 }}>
      <TopBar />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Welcome to the Dashboard
        </Typography>
        {/*<Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>*/}
      </Box>

      {/* Role-based sections */}
      <RoleBasedRoute allowedRoles={['Admin']}>
        <AdminTools />
      </RoleBasedRoute>

      <RoleBasedRoute allowedRoles={['Editor']}>
        <EditorTools />
      </RoleBasedRoute>

      {/* Stat Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 5,
        }}
      >
        <StatCard title="Total Posts" value={totalPosts} gradient="grey" />
        <StatCard title="Total Categories" value={totalCategories} gradient="grey" />
        <StatCard title="Total Users" value={totalUsers} gradient="grey" />
      </Box>


        <Box mb={4}>
          <Button
            component={Link}
            to="/posts/add"
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #7b1fa2, #ab47bc)",
              color: "#fff",
              textTransform: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              ":hover": {
                opacity: 0.9,
              },
            }}
          >
            ➕ Create New Post
          </Button>
        </Box>
  

      {/* Recent Posts */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          Recent Posts
        </Typography>
        {recentPosts.length > 0 ? (
          <List>
            {recentPosts.map((post) => (
              <ListItem key={post._id} sx={{ borderBottom: "1px solid #eee" }}>
                <ListItemText
                  primary={post.title}
                  secondary={`Created on: ${new Date(post.createdAt).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No recent posts found.</Typography>
        )}
      </Paper>
{/*
      <Typography variant="h6" mb={2}>
        All Posts
      </Typography>
      <PostList />
*/}
      <Box mt={4}>
        <Button
          component={Link}
          to="/posts"
          variant="outlined"
          color="primary"
          sx={{ textTransform: "none" }}
        >
          View All Posts
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;

const StatCard = ({
  title,
  value,
  gradient,
}: {
  title: string;
  value: number | null;
  gradient: string;
}) => (
  <Paper
    elevation={6}
    sx={{
      flex: "1 1 250px",
      p: 3,
      borderRadius: "20px",
      background: gradient,
      color: "#fff",
      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
      transition: "transform 0.3s ease",
      ":hover": {
        transform: "scale(1.03)",
      },
    }}
  >
    <Typography variant="subtitle1" fontWeight={600}>
      {title}
    </Typography>
    <Typography variant="h3" fontWeight={700}>
      {value}
    </Typography>
  </Paper>
);
