import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/redux/store.";
import "./index.css";

import Login from "./page/Login";
import Home from "./page/Home";
import Task from "./page/Task";
import TaskCompelted from "./page/TaskCompelted";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/TodoList",
    element: <Task />,
  },
  {
    path: "/TaskCompelted",
    element: <TaskCompelted />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {" "}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
