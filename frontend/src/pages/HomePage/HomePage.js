import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return( 
    <div className="container">
      <h1 >Auction Here</h1>
    </div>
  );
};

export default HomePage;
