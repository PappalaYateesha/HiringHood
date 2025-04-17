
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostDraft {
  title: string;
  content: string;
  category?: string;
  status: 'draft' | 'published';
  tags?: string[];
  image?: string;
}

const initialState: PostDraft = {
  title: '',
  content: '',
  category: '',
  status: 'draft',
  tags: [],
  image: '',
};

const postFormSlice = createSlice({
  name: 'postForm',
  initialState,
  reducers: {
    setPostDraft: (state, action: PayloadAction<PostDraft>) => {
      return action.payload;
    },
    clearPostDraft: () => initialState,
  },
});

export const { setPostDraft, clearPostDraft } = postFormSlice.actions;
export default postFormSlice.reducer;
