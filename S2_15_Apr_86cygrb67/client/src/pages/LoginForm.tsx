import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import styled from "styled-components";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
});

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: grey;
`;

const LoginCard = styled(Paper)`
  padding: 3rem 2rem;
  max-width: 400px;
  width: 100%;
  border-radius: 20px;
  box-shadow: black;
  animation: fadeIn 0.6s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledButton = styled(Button)`
  margin-top: 1.5rem;
  border-radius: 30px;
  font-weight: bold;
  padding: 0.75rem;
  background-color:grey;

  &:hover {
    background-color: black;
  }
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post("http://localhost:5000/api/auth/login", values);
        console.log('Login Response:', data);
        localStorage.setItem("token",data.token);
        localStorage.setItem("userRole", data.role);
        const userWithToken = {
          ...data.user,
          token: data.token,
        };
        dispatch(setUser(userWithToken));
        dispatch(setUser(data));
        navigate("/dashboard");
      } catch (err) {
        console.error("Login failed:", err);
        setError("Invalid email or password");
      }
    },
  });

  return (
    <Container>
      <LoginCard elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          🚀 Welcome Back
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" mb={2}>
          Login to your account
        </Typography>

        {error && (
          <Typography color="error" align="center" marginBottom={2}>
            {error}
          </Typography>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <StyledButton type="submit" variant="contained" fullWidth>
            Login
          </StyledButton>
        </form>
      </LoginCard>
    </Container>
  );
};

export default LoginForm;
