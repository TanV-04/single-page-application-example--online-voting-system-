import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <>
      <p>Home</p>
      <Link to="/about">Click here to go to about</Link>
    </>
  );
};

export default HomeComponent;
