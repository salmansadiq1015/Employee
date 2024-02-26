import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useCard } from "../../context/card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function HProducts() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCard();
  const navigate = useNavigate();

  // Get all Products

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product`
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Products - best offers"}>
      <div className="home-container">
        <div className="row">
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "1rem",
              marginBottom: "1.5rem",
              textShadow: "-1px 1px 0px orange, -2px 2px 0px orangered",
              color: "orangered",
            }}
          >
            All Products
          </h1>

          {/* ALl Products */}

          <div
            className="allProducts"
            style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}
          >
            {products?.map((p) => (
              <div className="card" style={{ width: "20rem" }} key={p._id}>
                <img
                  src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "20rem" }}
                />
                <div className="card-body">
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
                    <button
                      className="button"
                      style={{
                        float: "right",
                        height: "2.8rem",
                        width: "7.5rem",
                        background: "green",
                      }}
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Product added to cart", {
                          position: "top-center",
                          theme: "dark",
                        });
                      }}
                    >
                      Add to card
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
