import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();

  // Get user Data
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
  }, [auth?.user]);

  // Handle Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/auth/profile`,
        {
          name,
          email,
          phone,
          address,
        }
      );
      if (data?.success) {
        setAuth({ ...auth, user: data?.updateUser });
        let localStor = localStorage.getItem("auth");
        localStor = JSON.parse(localStor);
        localStor.user = data?.updateUser;
        localStorage.setItem("auth", JSON.stringify(localStor));
        toast.success(data?.message, {
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

  return (
    <Layout title={"User-Profile"}>
      <div className="container-fluid " style={{ padding: "0" }}>
        <div className="row">
          <div className="col-md-3 mt-2">
            <UserMenu />
          </div>
          <div className="col-md-9" style={{ padding: "0" }}>
            <div className="register-container">
              <div className="reg-content">
                <h3>Update Profile</h3>
                <form onSubmit={handleUpdate}>
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

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
