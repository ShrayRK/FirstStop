import React, { useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const {loginUser, isLoggedIn } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  const from = location.state?.from || "/";

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if(name.trim() === "" || password.trim() === ""){
        toast.error("Please enter both username and password.")
        return;
    }

    const result = loginUser(name, password);
    setSuccess(result);
};

    useEffect(() => {
        if(success === true) {
        toast.success("Login successful", {
            onClose: () => navigate(from, { replace: true }),
        });
    } else {
        toast.error("Login failed. Please check your credntials.");
    }
        }, [success, navigate, from]);

    if (isLoggedIn) {
        navigate(from, {replace: true});
        return null;
    }

    return (
       <div className="App container py-5 col-6">
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Username:</label>
                <input type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e)=> setName(e.target.value)} 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input type="text"
                id="password"
                className="form-control"
                value={password}
                onChange={(e)=> setPassword(e.target.value)} 
                />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <ToastContainer />
       </div>
    )
};
