import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { deleteRecipe } from "../redux/recipeSlice";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { FaTrash, FaEdit, FaArrowLeft } from "react-icons/fa";

const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipe = useSelector((state: RootState) =>
    state.recipes.recipes.find((r) => r.id === id)
  );

  if (!recipe) return <Typography variant="h5" color="error">Recipe not found</Typography>;

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
      {/* Left Side - Image (50% of the screen) */}
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={recipe.image}
          alt={recipe.title}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Right Side - Details (50% of the screen) */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", p: 4 }}>
        <Card sx={{ boxShadow: 6, borderRadius: 4, p: 4, height: "80%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <CardContent>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {recipe.title}
            </Typography>

            <Typography variant="h5" color="textSecondary">
              Ingredients:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {recipe.ingredients.join(", ")}
            </Typography>

            <Typography variant="h5" color="textSecondary">
              Instructions:
            </Typography>
            <Typography variant="body1">{recipe.instructions}</Typography>
          </CardContent>

          {/* Action Buttons at Bottom */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<FaTrash />}
              onClick={() => {
                dispatch(deleteRecipe(id!));
                navigate("/");
              }}
            >
              Delete
            </Button>

            <Button variant="contained" color="primary" startIcon={<FaEdit />} component={Link} to={`/edit/${id}`}>
              Edit
            </Button>

            <Button variant="outlined" startIcon={<FaArrowLeft />} component={Link} to="/">
              Back to Home
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default RecipeDetailsPage;
