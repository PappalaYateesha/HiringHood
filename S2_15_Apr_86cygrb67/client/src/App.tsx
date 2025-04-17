import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import PostList from "./pages/PostList";
import AddEditPost from "./pages/AddEditPost"; 
import CategoryList from "./pages/CategoryList";
import Unauthorized from "./pages/Unauthorized";
import UserList from "./pages/UserList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/slices/authSlice";
import Layout from "./pages/Layout";

export default function App() {
  const dispatch = useDispatch();
  const allRoles = ['Admin', 'Editor'];
  const adminOnly = ['Admin'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {

        const parsedUser = JSON.parse(userData);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute element={<Dashboard />} roles={allRoles} />
        }
      />
      
      <Route
  path="/posts"
  element={<PrivateRoute element={<PostList />} roles={allRoles} />}
/>

      <Route
        path="/posts/add"
        element={
          <PrivateRoute element={<AddEditPost />} roles={["Admin", "Editor"]} />
        }
      />
      <Route
        path="/posts/edit/:id"
        element={
          <PrivateRoute element={<AddEditPost />} roles={["Admin", "Editor"]} />
        }
      />
      <Route
  path="/categories"
  element={<PrivateRoute element={<CategoryList />} roles={allRoles} />}
/>
      <Route
  path="/users"
  element={<PrivateRoute element={<UserList />} roles={adminOnly} />}
/>
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}
