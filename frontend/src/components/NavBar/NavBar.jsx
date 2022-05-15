import React from "react";
import { useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
 
  let loggedIn;
  if (user){
    loggedIn = true;
  }
  
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>GetAGonga Auctions - </b>
          </Link>
        </li>
        <li className="w-50 text-end">
          <div className="btn-right">
            {user ? (
              <button className="btn" onClick={logoutUser}>Logout</button>
            ) : (
              <button className="btn" onClick={() => navigate("/login")}>Login</button>            
            )}
            {loggedIn && user.isAdmin ? (
              <button className="btn" onClick={() => navigate("/admin")}>Admin</button>
              ):(
              <button className="btn" onClick={() => navigate("/")}>Auction</button>  
              )
            }
          </div>          
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
