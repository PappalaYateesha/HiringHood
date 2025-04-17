import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Card, CardContent, Box } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-width: 600px;
  text-align: center;
`;

const StyledCard = styled(Card)`
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const LogoutButton = styled(Button)`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
`;

const Home = ({ setAuth }: { setAuth: (auth: boolean) => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    navigate("/login");
  };

  return (
    <Wrapper>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back! 🎉
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            You are successfully logged in. Explore and manage your tasks efficiently.
          </Typography>
          <Box mt={3}>
            <LogoutButton onClick={handleLogout} variant="contained" color="error">
              Logout
            </LogoutButton>
          </Box>
        </CardContent>
      </StyledCard>
    </Wrapper>
  );
};

export default Home;
