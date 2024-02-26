import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Spinner({ path = "login" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="d-flex justify-content-center  "
          style={{ flexDirection: "column", gap: "2rem", alignItems: "center" }}
        >
          <h1
            className="text-center"
            style={{
              textShadow: "-1px 2px 0px orangered, -2px 2px 0px orangered",
            }}
          >
            Redirecting to you in {count} seconds
          </h1>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
}
