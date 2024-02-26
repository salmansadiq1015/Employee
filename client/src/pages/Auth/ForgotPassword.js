import React, { useState } from "react";
import "./auth.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
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

  // --------------Return------------
  return (
    <>
      <Layout title={"Forgot Password - Ecom Store"}>
        <div className="login-container">
          <div className="login-content">
            <h3>Forgot Password</h3>
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
                  type="text"
                  className="form-control"
                  placeholder="Enter your best friend name?"
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password..."
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Forgot Password
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
