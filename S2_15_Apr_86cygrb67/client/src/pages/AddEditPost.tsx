import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Box,
  InputLabel,
  FormControl,
  Select,
  Chip,
  FormHelperText,
  Container,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../features/api/axiosInstance";
import TopBar from "./topbar";

interface Category {
  _id: string;
  name: string;
}

interface PostFormValues {
  title: string;
  content: string;
  category: string;
  tags: string[];
  status: string;
  image: File | null;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  category: Yup.string().required("Category is required"),
  status: Yup.string().oneOf(["draft", "published"]).required("Status is required"),
});

const LOCAL_STORAGE_KEY = "draftPost";

const AddEditPost = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(postId);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const formik = useFormik<PostFormValues>({
    initialValues: {
      title: "",
      content: "",
      category: "",
      tags: [],
      status: "draft",
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "image" && value) formData.append(key, value);
        else if (key === "tags") formData.append(key, JSON.stringify(value));
        else formData.append(key, value as string);
      });

      try {
        if (isEditMode) {
          await axiosInstance.put(`/api/posts/${postId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          await axiosInstance.post("/api/posts", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
        alert("Post saved successfully!");
        navigate("/posts");
      } catch (error) {
        console.error("Error submitting post", error);
      }
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/api/categories");
        setCategories(res.data.categories ?? res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const fetchPost = async () => {
        try {
          const res = await axiosInstance.get(`/api/posts/${postId}`);
          const post = res.data;
          formik.setValues({
            title: post.title || "",
            content: post.content || "",
            category: post.category?._id || "",
            tags: post.tags || [],
            status: post.status || "draft",
            image: null,
          });
          if (post.imageUrl) {
            setPreviewImage(post.imageUrl);
          }
        } catch (err) {
          console.error("Error loading post", err);
        }
      };
      fetchPost();
    }
  }, [isEditMode, postId]);

  useEffect(() => {
    if (!isEditMode) {
      const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          parsed.tags = Array.isArray(parsed.tags) ? parsed.tags : [];
          delete parsed.image;
          formik.setValues({ ...formik.initialValues, ...parsed });
        } catch (err) {
          console.warn("Failed to load draft", err);
        }
      }
    }
  }, [isEditMode]);

  useEffect(() => {
    if (!isEditMode) {
      const timeout = setTimeout(() => {
        const { image, ...rest } = formik.values;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rest));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [formik.values, isEditMode]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
    <TopBar />
    <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
      
      <Paper elevation={4} sx={{ padding: 4, width: "100%", borderRadius: 3 }}>
        <Typography variant="h5" textAlign="center" fontWeight={600} gutterBottom>
          {isEditMode ? "Edit Post" : "Create Post"}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            margin="normal"
          />

          <TextField
            fullWidth
            multiline
            rows={5}
            label="Content"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
            margin="normal"
          />

          <FormControl
            fullWidth
            margin="normal"
            error={formik.touched.category && Boolean(formik.errors.category)}
          >
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Category"
            >
              {loading ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : (
                categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))
              )}
            </Select>
            {formik.touched.category && formik.errors.category && (
              <FormHelperText>{formik.errors.category}</FormHelperText>
            )}
          </FormControl>

          <TextField
            fullWidth
            label="Tags (comma separated)"
            name="tags"
            value={formik.values.tags?.join(", ")}
            onChange={(e) =>
              formik.setFieldValue(
                "tags",
                e.target.value.split(",").map((tag) => tag.trim())
              )
            }
            margin="normal"
          />

          {formik.values.tags?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              {formik.values.tags.map((tag, i) => (
                <Chip key={i} label={tag} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          )}

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Status"
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>

          {previewImage && (
            <Box mt={2} textAlign="center">
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: "100%", borderRadius: 8 }}
              />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, fontWeight: 600 }}
          >
            {isEditMode ? "Update Post" : "Create Post"}
          </Button>
        </form>
      </Paper>
    </Container>
    </>
  );
};

export default AddEditPost;
