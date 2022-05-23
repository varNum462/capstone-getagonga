import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import '../LoginPage/LoginPage.css'

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = { name: "", email: "", password: "", isAdmin: false };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className="container">
      <h2>To view auctions and place bids on items, please register for an account.</h2>
      <h3>All fields are required.</h3>
      <div className="w-35 mx-auto mt-5">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group input-group-lg">
            <span className="input-group-text">Name:{" "}</span>
            <input type="text" className="form-control form-control-lg m-0" name="name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="input-group input-group-lg">
            <span className="input-group-text">Email:{" "}</span>
            <input type="text" className="form-control form-control-lg m-0" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="input-group input-group-lg">
            <span className="input-group-text">Password:{" "}</span>
            <input type="text" className="form-control form-control-lg m-0" name="password" value={formData.password} onChange={handleInputChange} />
          </div>
          <button className="btn btn-primary">Register!</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
