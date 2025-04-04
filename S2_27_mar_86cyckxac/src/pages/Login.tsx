import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography, Card, CardContent, Box } from "@mui/material";
import styled from "styled-components";

// ✅ Import IndexedDB utility
import { getUser } from "../utils/db";

const Background = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #6a11cb, #2575fc);
`;

const StyledCard = styled(Card)`
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  width: 100%;
  max-width: 420px;
  text-align: center;
`;

const ErrorText = styled.div`
  color: #ff4d4d;
  font-size: 14px;
  margin-top: 4px;
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

const Login = ({ setAuth }: { setAuth: (auth: boolean) => void }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Background>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back 👋
          </Typography>
          <Typography variant="body2" color="black" mb={2}>
            Please log in to continue
          </Typography>

          {errorMessage && (
            <Typography variant="body2" color="red" mb={2}>
              {errorMessage}
            </Typography>
          )}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setErrorMessage(null);

              try {
                const user = await getUser(values.email);

                if (user && user.password === values.password) {
                  localStorage.setItem("userEmail", user.email);
                  setAuth(true);
                  navigate("/home");
                } else {
                  setErrorMessage("Invalid credentials. Please try again.");
                }
              } catch (error) {
                setErrorMessage("Error accessing database.");
              }

              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  name="email"
                  label="Your Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { backgroundColor: "rgba(255,255,255,0.2)", color: "black" } }}
                />
                <ErrorMessage name="email" component={ErrorText} />

                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { backgroundColor: "rgba(255,255,255,0.2)", color: "black" } }}
                />
                <ErrorMessage name="password" component={ErrorText} />

                <Box mt={3}>
                  <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </Box>

                <Typography variant="body2" textAlign="center" mt={2} style={{ color: "black" }}>
                  Don’t have an account?{" "}
                  <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/signup")}>
                    Sign Up
                  </span>
                </Typography>
              </Form>
            )}
          </Formik>
        </CardContent>
      </StyledCard>
    </Background>
  );
};

export default Login;
