import React, { useState, useEffect } from "react";
import "./home.css";
import Layout from "../../components/Layout/Layout";
import HomeSlider from "./HomeSlider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../components/Prices";
import { useCard } from "../../context/card";

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCard();

  // Get ALL categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/category/all-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Get all Products

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error while getting products");
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();

    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  // Handle change
  const handleChange = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  // Load More

  useEffect(() => {
    if (page === 1) return;
    loadMore();

    // eslint-disable-next-line
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // get Filter Products

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();

    // eslint-disable-next-line
  }, [checked, radio]);

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"All Products - best offers"}>
        <div className="home-container">
          <HomeSlider />

          <div className="container-fluid m-3 p-3">
            <div className="row">
              <div
                className="col-md-2 filters"
                style={{ borderRight: "2px solid #ccc" }}
              >
                {/* ---------Category Filter---- */}

                <h4>Filter by Category</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".5rem",
                  }}
                >
                  {categories?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleChange(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>

                {/* Price Filter */}

                <h4 style={{ marginTop: "1.5rem" }}>Filter by Price</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".5rem",
                  }}
                >
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Prices?.map((p) => (
                      <div key={p._id}>
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="button mt-5"
                >
                  Reset Filters
                </button>
              </div>

              {/* --------Products Section------------- */}

              <div className="col-md-9 product-container">
                <h2>Popular Products</h2>

                {/* -----------Product Card ---------*/}

                <div
                  className="allProducts"
                  style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}
                >
                  {products?.map((p) => (
                    <div
                      className="card"
                      style={{ width: "20rem" }}
                      key={p._id}
                    >
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

                <div
                  className="m-2 p-3 "
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {products && products.length < total && (
                    <button
                      className="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                      style={{ borderRadius: "2rem", fontSize: "1.2rem" }}
                    >
                      {loading ? "Loading..." : "Load More"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
