import React, { useEffect, useState } from "react";
import "./category.css";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import Typewriter from "typewriter-effect";

export default function CategoryProduct() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getProductsbyCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-category/${params.slug}`
      );
      console.log(data);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsbyCat();

    // eslint-disable-next-line
  }, [params?.slug]);

  return (
    <Layout
      title={"category Us-Ecommerce Store"}
      keywords={"#categories ecommerce "}
    >
      <div className="all-category-container">
        <h1>{category?.name} </h1>
        <div className="category-clist">
          {/* -----------Product Card ---------*/}
          {products.length < 1 && (
            <h4
              className="text-center"
              style={{
                textAlign: "center",
                width: "100%",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              <Typewriter
                options={{
                  strings: ["Sorry, Product not available 🤯"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h4>
          )}

          <div
            className="allProducts"
            style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}
          >
            {products?.map((p) => (
              <div className="card category-card" key={p._id}>
                <img
                  src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
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
                      onClick={() => navigate(`/card`)}
                      style={{
                        float: "right",
                        height: "2.8rem",
                        width: "7.5rem",
                        background: "green",
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
