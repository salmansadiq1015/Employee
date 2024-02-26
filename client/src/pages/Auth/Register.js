import React, { useState } from "react";
import "./auth.css";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message, {
          position: "top-center",
          theme: "dark",
        });
        navigate("/login");
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

  // ---------Return Statment---------->
  return (
    <>
      <Layout>
        <div className="register-container">
          <div className="reg-content">
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name..."
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone..."
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address..."
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your best friend name?"
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
              <p className="account">
                Already have an account | <Link to="/login">Login</Link>
              </p>

              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
