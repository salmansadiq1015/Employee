import React, { useState } from "react";
import "./auth.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/Auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/auth/login`, {
        email,
        password,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message, {
          position: "top-center",
          theme: "dark",
        });
        setAuth({
          ...auth,
          user: res?.data?.user,
          token: res?.data?.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res?.data?.message, {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  // --------------Return------------
  return (
    <>
      <Layout>
        <div className="login-container">
          <div className="login-content">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password..."
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="account">
                Don't have an account | <Link to="/register">Register</Link>
              </p>
              <p className="account">
                <Link to="/forgot-Password">Forgot Password ?</Link>
              </p>

              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
