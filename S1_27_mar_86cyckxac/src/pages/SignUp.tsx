import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography, Card, CardContent, Box } from "@mui/material";
import styled from "styled-components";

// ✅ Correct Import from IndexedDB Utility
import { addUser } from "../utils/db";

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

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[0-9]/, "Must include at least one number")
    .matches(/[!@#$%^&*]/, "Must include at least one special character (!@#$%^&*)")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Required"),
});

const SignUp = ({ setAuth }: { setAuth: (auth: boolean) => void }) => {
  const navigate = useNavigate();

  return (
    <Background>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Create an Account 🚀
          </Typography>
          <Typography variant="body2" color="black" mb={2}>
            Sign up to get started on your journey!
          </Typography>

          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                // ✅ Store user in IndexedDB
                await addUser({ email: values.email, password: values.password });

                setAuth(true);
                navigate("/login");
              } catch (error) {
                setErrors({ email: "User already exists" });
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  name="email"
                  label="Email Address"
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

                <Field
                  as={TextField}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { backgroundColor: "rgba(255,255,255,0.2)", color: "black" } }}
                />
                <ErrorMessage name="confirmPassword" component={ErrorText} />

                <Box mt={3}>
                  <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                  </Button>
                </Box>

                <Typography variant="body2" textAlign="center" mt={2} style={{ color: "black" }}>
                  Already have an account?{" "}
                  <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")}>
                    Login
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

export default SignUp;
