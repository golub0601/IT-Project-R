import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import "./style/style.scss";
import SinglePost from "./pages/SinglePost";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [ 
      {
        path: "/",
        element: <Home/>,
      },  
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/post/:id",
        element: <SinglePost/>,
      },
    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

function App() {
  return (
  <div className="app">
    <div className="container">  
      <RouterProvider router={router} />
    </div>
  </div>
  );
}



export default App;
