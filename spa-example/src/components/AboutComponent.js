import React from "react";
import { Link } from "react-router-dom";

const AboutComponent = () => {
  return (
    <>
    <p>about</p>
      <Link to="/home">Click here to go back to home</Link>
    </>
  );
};

export default AboutComponent;
