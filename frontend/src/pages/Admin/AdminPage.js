import React from "react";
//import AuthContext from "../../context/AuthContext";
//import { Link } from "react-router-dom";
import "./AdminPage.css";
import Auctions from "../../components/Admin/Auctions";
//import Items from "../../components/Admin/Items";

const AdminPage = () => {  

  return (
    <div className="container">
        <h2>Admin Console</h2>  
        <Auctions />
        
    </div>
  );
};

export default AdminPage;
