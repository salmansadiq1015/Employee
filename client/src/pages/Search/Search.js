import React from "react";
import "./search.css";
import Layout from "../../components/Layout/Layout";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
import { useCard } from "../../context/card";
import { toast } from "react-toastify";

export default function Search() {
  const navigate = useNavigate();
  const [values] = useSearch();
  const [cart, setCart] = useCard();

  return (
    <Layout title={"search results"}>
      <div className="container search-container">
        <div className="text-center search-details">
          <h1>Search Results</h1>
          <h3>
            {values?.results.length < 1
              ? "No Products found 😇"
              : `Found ${values?.results.length}`}
          </h3>

          {/* Card Products */}
          <div
            className="allProducts"
            style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}
          >
            {values?.results?.map((p) => (
              <div className="card" style={{ width: "20rem" }} key={p._id}>
                <img
                  src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "20rem" }}
                />
                <div
                  className="card-body"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h3
                    className="card-title"
                    style={{ fontSize: "1.5rem", fontWeight: "600" }}
                  >
                    {p.name}
                  </h3>
                  <div
                    className="price"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h5 style={{ fontSize: "1.2rem" }}>Rs. {p.price}</h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>

                  <div
                    className="buttons"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      className="button"
                      style={{
                        float: "right",
                        height: "2.8rem",
                        width: "7.5rem",
                      }}
                      onClick={() => {
                        setCart([...cart, p]);
                        toast.success("Product added to cart", {
                          position: "top-center",
                          theme: "dark",
                        });
                      }}
                    >
                      Add to card
                    </button>
                    <button
                      className="button"
                      onClick={() => navigate(`/product/${p.slug}`)}
                      style={{
                        float: "right",
                        height: "2.8rem",
                        width: "7.8rem",
                        background: "rgb(241, 0, 149)",
                      }}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
