import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./Features/createTodo/libs/Todo";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
export type RooteState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
