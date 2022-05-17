import React from "react";
//import AuthContext from "../../context/AuthContext";
//import { Link } from "react-router-dom";
import "./AdminPage.css";
import Auctions from "../../components/Admin/Auctions";
import Items from "../../components/Admin/Items";

const AdminPage = () => {  

    function toggleItems(action){
        if (action == 'Items'){
            document.getElementById("auctionAdmin").className = "d-none";
            document.getElementById("itemAdmin").className = "container itemAdmin";
        }else{            
            document.getElementById("auctionAdmin").className = "container auctionAdmin";
            document.getElementById("itemAdmin").className = "d-none";
        }
    }
    
  return (
    <div className="container">
        <h2>Admin Console</h2>  
        <Auctions />  
        <Items />      
    </div>
  );
};

export default AdminPage;
