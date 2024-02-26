import React from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../images/logo.png";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCard } from "../../context/card";
import { Badge } from "antd";

export default function Header() {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCard();

  // handleLogout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully!", {
      position: "top-center",
      theme: "dark",
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="Logo" style={{ width: "4rem" }} />
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              {/* -------Category-------- */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/categories"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Category
                </Link>
                <ul className="dropdown-menu">
                  <li className="hcategory-list">
                    <Link className="dropdown-item" to="/categories">
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id} className="hcategory-list">
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* ----------------------------- */}

              <li
                className="nav-item cardCollection"
                style={{ marginRight: "2rem" }}
              >
                <Badge count={cart.length} showZero>
                  <NavLink to="/card" className="nav-link">
                    <FaShoppingCart size={25} />{" "}
                  </NavLink>
                </Badge>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      style={{ marginLeft: "-5rem" }}
                    >
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="nav-link dashbord"
                        >
                          DashBoard
                        </NavLink>
                      </li>
                      {/* className="dropdown-item" */}
                      <li className="nav-item">
                        <NavLink
                          to="/login"
                          onClick={handleLogout}
                          className="nav-link"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* Dropdown */}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
