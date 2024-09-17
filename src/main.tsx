import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider dari react-redux
import "./index.css";

import Home from "./page/Home";
import Blogs from "./Component/Blogs";
import Informasi from "./Component/Informasi";
import { store } from "./Component/redux/Store/store"; // Pastikan path ke store sudah benar

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Blogs",
    element: <Blogs />,
  },
  {
    path: "/Informasi",
    element: <Informasi />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* Tambahkan Provider di sini */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
