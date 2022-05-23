import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { email: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="container">
      <div className="w-75 m-auto mb-4">
        <h1>Welcome to GetAGonga Auctions!</h1>
        <h2>A "gonga" is slang for a great deal or bargain, and there's no better place to find a gonga than right here! </h2>
        <h4>Please log in to view auctions.</h4> 
      </div>
      <div className="w-35 mx-auto">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group input-group-lg">
            <span className="input-group-text">Email:{" "}</span>
            <input type="text" className="form-control form-control-lg m-0" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="input-group input-group-lg">
            <span className="input-group-text">Password:{" "}</span>
            <input type="password" className="form-control form-control-lg m-0" name="password" value={formData.password} onChange={handleInputChange} />
          </div>
          {isServerError ? (
            <p className="error">Login failed, incorrect credentials!</p>
          ) : null} 
          <button className="btn btn-primary">Login!</button>
          <h4 className="my-3">Don't have an account yet? <Link to="/register">Register here!</Link></h4>
         
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
