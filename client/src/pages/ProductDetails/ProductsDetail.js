import React, { useEffect, useState } from "react";
import "./detail.css";
import Layout from "../../components/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCard } from "../../context/card";
import { toast } from "react-toastify";

export default function ProductsDetail() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCard();

  //   initial details
  useEffect(() => {
    if (params?.slug) getProduct();

    // eslint-disable-next-line
  }, [params?.slug]);

  // Get Products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.products);
      getSimilarProducts(data?.products._id, data?.products.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Related Products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div
        className="row container p-3 flex flex-wrap "
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-6 images">
          <img
            src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{
              borderRadius: ".5rem",
              border: "2px solid #bbb",
              boxShadow: ".1rem .2rem .2rem rgba(0,0,0,0.2)",
            }}
          />
        </div>
        <div className="col-md-5 P-details">
          <h1 className="text-center">Product Details</h1>
          <h4>
            <b>Name:</b> {product.name}
          </h4>
          <h6>
            <b>Price:</b> Rs. {product.price}
          </h6>
          <p>
            <b>Quantity:</b> {product.quantity}
          </p>
          <p>
            <b>Category:</b> {product.category?.name}
          </p>
          <p style={{ width: "100%", textAlign: "justify" }}>
            <b>Description: </b> {product.description}
          </p>
          <button
            className="button"
            style={{
              height: "2.8rem",
              width: "7.5rem",
              background: "green",
            }}
            onClick={() => {
              setCart([...cart, product]);
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
      <hr />

      <div className="row container p-3 s-details">
        <h1>Similar Products</h1>
        {relatedProducts.length < 1 && (
          <h4 className="text-center">No Similar Products Found 🤯</h4>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2 " style={{ width: "22rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                style={{ height: "17rem" }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "600" }}>
                  {p.name}
                </h5>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <b>Rs. {p.price}</b>
                </div>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "2rem",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    className="button"
                    style={{ background: "purple", border: "none" }}
                  >
                    <Link
                      to={`/product/${p.slug}`}
                      style={{ color: "#fff", textDecoration: "none" }}
                    >
                      More Details
                    </Link>
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
    </Layout>
  );
}
