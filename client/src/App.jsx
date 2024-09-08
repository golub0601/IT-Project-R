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
import Landing from "./pages/Landing";

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
    path: "/posts", // Any route under /posts gets the Layout
    element: <Layout />,
    children: [ 
      {
        path: "home", // URL will be /posts/home
        element: <Home />,
      },  
      {
        path: "write", // URL will be /posts/write
        element: <Write />,
      },
      {
        path: "post/:id", // URL will be /posts/post/:id
        element: <SinglePost />,
      },
    ]
  },
  {
    path: "/", // Root route for landing
    element: <Landing />, // No Layout here, so no Navbar/Footer
  },
  {
    path: "/register", // Register route
    element: <Register />,
  },
  {
    path: "/login", // Login route
    element: <Login />,
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
