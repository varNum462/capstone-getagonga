import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      <ul className="m-0">
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>GetAGonga Auctions</b>
          </Link>
        </li>
        <li className="w-30 text-end d-flex justify-content-end">
          <div className="btn-right d-flex">
            {loggedIn && user.isAdmin ? (
              <div>
                <button className="btn mx-3" onClick={() => navigate("/admin")}>Admin</button>
                <button className="btn mx-3" onClick={() => navigate("/")}>Home</button>
              </div>
              ):null
            }
            {user ? (
              <div>
                <button className="btn" onClick={logoutUser}>Logout</button>
              </div>
            ) : null
            }            
          </div>          
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
