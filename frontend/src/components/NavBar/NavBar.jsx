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
          <div className="btn-right">
            {user ? (
              <button className="btn" onClick={logoutUser}>Logout</button>
            ) : null
            }
            {loggedIn && user.isAdmin ? (
              <button className="btn mx-3" onClick={() => navigate("/admin")}>Admin</button>
              ):null
            }
          </div>          
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
