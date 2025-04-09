import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, editRecipe } from "../redux/recipeSlice";
import { useNavigate, useParams } from "react-router-dom";
import { 
  TextField, Button, Box, Typography, Container, Paper, Card, CardContent, Tabs, Tab 
} from "@mui/material";
import { RootState } from "../redux/store";
import { FaSave, FaTimes, FaUpload } from "react-icons/fa";

const AddEditRecipePage = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingRecipe = useSelector((state: RootState) =>
    state.recipes.recipes.find((recipe) => recipe.id === id)
  );

  const [imageType, setImageType] = useState(existingRecipe?.image ? "url" : "upload");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      title: existingRecipe ? existingRecipe.title : "",
      image: existingRecipe ? existingRecipe.image : "",
      description: existingRecipe ? existingRecipe.description : "",
      ingredients: existingRecipe ? existingRecipe.ingredients.join(", ") : "",
      instructions: existingRecipe ? existingRecipe.instructions : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      ingredients: Yup.string().required("Ingredients are required"),
      instructions: Yup.string().required("Instructions are required"),
      image: Yup.string().test("image-required", "Image is required", function (value) {
        const { imageType } = this.parent;
        if (imageType === "url") {
          return Yup.string().url().isValidSync(value);
        }
        return true;
      }),
      
    }),
    onSubmit: (values) => {
      const recipe = {
        id: id || Date.now().toString(),
        title: values.title,
        image: imageType === "url" ? values.image : URL.createObjectURL(uploadedImage!),
        description: values.description,
        ingredients: values.ingredients.split(",").map((item) => item.trim()),
        instructions: values.instructions,
      };

      id ? dispatch(editRecipe(recipe)) : dispatch(addRecipe(recipe));
      navigate("/");
    },
  });

  return (
    <Container maxWidth="md" sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ boxShadow: 6, borderRadius: 4, width: "100%", maxWidth: 600 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 3 }}>
            {id ? "Edit Recipe" : "Add New Recipe"}
          </Typography>

          <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                {...formik.getFieldProps("title")}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Short Description"
                {...formik.getFieldProps("description")}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                margin="normal"
                multiline
                rows={2}
              />
        
              {imageType === "url" ? (
                <TextField
                  fullWidth
                  label="Image URL"
                  {...formik.getFieldProps("image")}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                  margin="normal"
                />
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<FaUpload />}
                  >
                    Upload Image
                    <input 
                      type="file" 
                      hidden 
                      accept="image/*"
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          setUploadedImage(event.target.files[0]);
                        }
                      }}

                      
                    />
                  </Button>
                  {uploadedImage && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {uploadedImage.name}
                    </Typography>
                  )}
                </Box>
              )}
              <Tabs value={imageType} onChange={(_, newValue) => setImageType(newValue)} centered>
                <Tab label="Image URL" value="url" />
                <Tab label="Upload Image" value="upload" />
              </Tabs>
              <TextField
                fullWidth
                label="Ingredients (comma-separated)"
                {...formik.getFieldProps("ingredients")}
                error={formik.touched.ingredients && Boolean(formik.errors.ingredients)}
                helperText={formik.touched.ingredients && formik.errors.ingredients}
                margin="normal"
                multiline
                rows={2}
              />

              <TextField
                fullWidth
                label="Instructions"
                {...formik.getFieldProps("instructions")}
                error={formik.touched.instructions && Boolean(formik.errors.instructions)}
                helperText={formik.touched.instructions && formik.errors.instructions}
                margin="normal"
                multiline
                rows={4}
              />

              <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  startIcon={<FaTimes />}
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  startIcon={<FaSave />}
                >
                  Save Recipe
                </Button>
              </Box>
            </Box>
          </Paper>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddEditRecipePage;