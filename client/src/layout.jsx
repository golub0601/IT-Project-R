import React, { useState, useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";  // useNavigation helps to track route changes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";  // Import the spinner

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();  // React Router hook to track navigation state

  useEffect(() => {
    if (navigation.state === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [navigation]);

  return (
    <>
      {loading && <LoadingSpinner />}  {/* Show spinner when loading */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
