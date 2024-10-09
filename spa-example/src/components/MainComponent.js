import React from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import About from "./AboutComponent";
import Home from "./HomeComponent";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom"; // pull modules from react-router-dom

const MainComponent = () => {
  return (
    <>
      {/* react fragment */}
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<navigate to="/home" />} />
        {/* the route path = "*" catches all the undefined routes and redirects them to the /home route */}
      </Routes>
      <Footer />
    </>
  );
};

export default MainComponent;
