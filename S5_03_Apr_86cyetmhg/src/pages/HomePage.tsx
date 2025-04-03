import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { 
  Box, Button, Card, CardMedia, CardContent, Typography, Container 
} from "@mui/material";
import { FaPlus } from "react-icons/fa";

const HomePage = () => {
  const recipes = useSelector((state: RootState) => state.recipes.recipes);

  return (
    <Container maxWidth="md">
      {/* Header */}
      <Typography 
        variant="h3" 
        gutterBottom 
        sx={{ textAlign: "center", fontWeight: "bold", mt: 3, color:"black"}}
      >
        📖 Recipe Book
      </Typography>

      {/* Add Recipe Button */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<FaPlus />} 
          component={Link} 
          to="/add"
          sx={{
            backgroundColor: "#ff5722",
            "&:hover": { backgroundColor: "#e64a19" },
            fontSize: "1rem",
            padding: "10px 20px"
          }}
        >
          Add New Recipe
        </Button>
      </Box>

      {/* Recipe List */}
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
        {recipes.map((recipe) => (
          <Card 
            key={recipe.id} 
            component={Link} 
            to={`/recipe/${recipe.id}`} 
            sx={{ 
              textDecoration: "none", 
              width: "280px",
              boxShadow: 3, 
              borderRadius: 3, 
              transition: "0.3s", 
              "&:hover": { transform: "scale(1.05)", boxShadow: 6 } 
            }}
          >
            <CardMedia 
              component="img" 
              height="200" 
              image={recipe.image} 
              alt={recipe.title} 
              sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            />
            <CardContent sx={{ textAlign: "center" }}>
  <Typography variant="h6" fontWeight="bold">{recipe.title}</Typography>
  <Typography 
    variant="body2" 
    color="text.secondary" 
    sx={{ mt: 1, fontStyle: "italic" }}
  >
    {recipe.description ? recipe.description : "No description available"}
  </Typography>
</CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;
