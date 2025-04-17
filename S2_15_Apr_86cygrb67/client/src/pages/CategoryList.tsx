import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategory, fetchCategories } from '../redux/slices/categorySlice';
import { RootState, AppDispatch } from '../redux/store';
import TopBar from './topbar';

interface Category {
  _id: string;
  name: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CategoryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Category name is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(createCategory(values));
        if (createCategory.fulfilled.match(resultAction)) {
          formik.resetForm();
          setSnackbar({
            open: true,
            message: 'Category added successfully!',
            severity: 'success',
          });
        } else {
          const errorMessage = (resultAction.payload as any)?.message || 'Failed to add category!';
          setSnackbar({ open: true, message: errorMessage, severity: 'error' });
        }
      } catch (error) {
        setSnackbar({ open: true, message: 'Something went wrong!', severity: 'error' });
      }
    },
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDeleteDialogOpen = (category: Category) => {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        const resultAction = await dispatch(deleteCategory(categoryToDelete._id));
        if (deleteCategory.fulfilled.match(resultAction)) {
          setSnackbar({
            open: true,
            message: 'Category deleted successfully',
            severity: 'success',
          });
        } else {
          const errorMessage = (resultAction.payload as any)?.message || 'Failed to delete category';
          setSnackbar({ open: true, message: errorMessage, severity: 'error' });
        }
      } catch (err) {
        setSnackbar({ open: true, message: 'An error occurred while deleting.', severity: 'error' });
      } finally {
        handleDeleteDialogClose();
      }
    }
  };

  return (
    <>
    <TopBar />
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Category Management
      </Typography>

      {/* Add Category Form */}
      <Card variant="outlined" sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New Category
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Category Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
              >
                Add Category
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* Category List */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Existing Categories
          </Typography>
          {isLoading ? (
            <Box textAlign="center" py={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">Error: {error}</Typography>
          ) : categories.length === 0 ? (
            <Typography color="text.secondary">No categories found.</Typography>
          ) : (
            <List>
              {categories.map((category) => (
                <ListItem
                  key={category._id}
                  divider
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteDialogOpen(category)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{categoryToDelete?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteCategory} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
    </>
  );
};

export default CategoryList;
