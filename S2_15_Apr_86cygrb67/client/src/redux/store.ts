
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { statsApi } from '../features/api/statsapi';
import categoreyReducer from '../redux/slices/categorySlice';
import postFormReducer from '../redux/slices/PostFormSlice';
import postReducer from'../redux/slices/postSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts:postReducer,
    postForm:postFormReducer,
    categories: categoreyReducer,
    [statsApi.reducerPath] :statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(statsApi.middleware),
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
