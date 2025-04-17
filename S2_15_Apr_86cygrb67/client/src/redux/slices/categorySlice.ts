import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../features/api/axiosInstance';

interface Category {
  _id: string;
  name: string;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

export const fetchCategories = createAsyncThunk<Category[]>('categories/fetchAll', async () => {
  const response = await axiosInstance.get('/api/categories');
  return response.data;
});

export const createCategory = createAsyncThunk<Category, any>('categories/create', async (categoryData: any) => {
  const response = await axiosInstance.post('/api/categories', categoryData);
  return response.data;
});

export const updateCategory = createAsyncThunk<Category, { id: string, categoryData: any }>('categories/update', async ({ id, categoryData }) => {
  const response = await axiosInstance.put(`/api/categories/${id}`, categoryData);
  return response.data;
});

export const deleteCategory = createAsyncThunk<string, string>('categories/delete', async (id: string) => {
  await axiosInstance.delete(`/api/categories/${id}`);
  return id;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [] as Category[],
    isLoading: false,
    error: null as string | null,
  } as CategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((category) => category._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
