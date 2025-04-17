import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) return undefined;
    return { todo: { todos: JSON.parse(serializedState) } };
  } catch (e) {
    console.warn("Failed to load from localStorage", e);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  preloadedState: loadState(), 
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const serializedTodos = JSON.stringify(state.todo.todos);
    localStorage.setItem("todos", serializedTodos);
  } catch (e) {
    console.warn("Failed to save to localStorage", e);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
