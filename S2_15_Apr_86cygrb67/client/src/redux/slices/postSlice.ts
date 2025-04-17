
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string; 
  category?: string;
  status: 'draft' | 'published'; 
  tags?: string[]; 
  image?: string; 
}

interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

export const createPost = createAsyncThunk<Post, Post>(
  'posts/create',
  async (postData: Post) => {
    console.log("Creating Post:", postData);  
    const response = await axios.post('/api/posts', postData);
    return response.data;
  }
);

export const updatePost = createAsyncThunk<Post, { postId: string; postData: Post }>(
  'posts/update',
  async ({ postId, postData }) => {
    const response = await axios.put(`/api/posts/${postId}`, postData);
    return response.data;
  }
);

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create post';
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update post';
      });
  },
});

export default postSlice.reducer;
