import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return <h1 className="container">Auction Here</h1>;
};

export default HomePage;
