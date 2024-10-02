import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { geTodo, ResponeTodo, AddTodo, completedTodo } from "./definitio";

// Mengambil semua todos
export const fetchTodos = createAsyncThunk<ResponeTodo>(
  "todos/fetchTodos",
  async () => {
    const response = await axios.get("https://dummyjson.com/todos");
    return response.data;
  }
);

// Menambahkan todo baru
export const fetchAddTodos = createAsyncThunk<AddTodo, Omit<AddTodo, "id">>(
  "todos/fetchAddTodos",
  async (newTodo) => {
    const response = await axios.post(
      "https://dummyjson.com/todos/add",
      newTodo,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  }
);

// Menandai todo sebagai selesai
export const fetchCompletedTodo = createAsyncThunk<number, number>(
  "todos/fetchCompletedTodo",
  async (todoId) => {
    await axios.delete(`https://dummyjson.com/todos/${todoId}`);
    return todoId; // Mengembalikan ID tugas yang telah dihapus
  }
);

// Memperbarui todo
export const fetchUpdateTodo = createAsyncThunk<
  geTodo,
  { id: number; completed: boolean; todo: string }
>("todos/fetchUpdateTodo", async ({ id, completed, todo }) => {
  const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
    completed,
    todo,
  });
  return response.data; // Pastikan ini sesuai dengan struktur data yang Anda harapkan
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [] as geTodo[],
    completedTodos: [] as completedTodo[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos; // Sesuaikan dengan struktur respons
        localStorage.setItem("todos", JSON.stringify(action.payload.todos));
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching data";
      })
      .addCase(fetchAddTodos.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        localStorage.setItem("todos", JSON.stringify(state.todos));
      })
      .addCase(fetchCompletedTodo.fulfilled, (state, action) => {
        const completedTodo = state.todos.find(
          (todo) => todo.id === action.payload
        );
        if (completedTodo) {
          state.completedTodos.push({
            ...completedTodo,
            completed: true,
            isDeleted: true,
            deletedOn: new Date().toISOString(),
          });
        }
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        localStorage.setItem("todos", JSON.stringify(state.todos));
      })
      .addCase(fetchUpdateTodo.fulfilled, (state, action) => {
        const updatedTodoIndex = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (updatedTodoIndex !== -1) {
          state.todos[updatedTodoIndex] = action.payload; // Perbarui todo yang diubah
          localStorage.setItem("todos", JSON.stringify(state.todos));
        }
      });
  },
});

// Ekspor reducer dan action
export const { setTodos } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
