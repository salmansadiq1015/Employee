import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Products() {
  // Get ALl Products
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product`
      );
      setProducts(data.products);
      console.log(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error while getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1
              className="text-center"
              style={{
                textShadow:
                  "-1px 1px 0px #666, -2px 2px 0px #666, -3px 3px 0px #666",
              }}
            >
              All Products
            </h1>
            {/* Product Card */}
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
                      <h5>Rs. {p.price}</h5>
                      <h5>Qnt. {p.quantity}</h5>
                    </div>
                    <p className="card-text">
                      {p.description.split("\n")[0].slice(0, 30)}...
                    </p>

                    <button
                      className="button"
                      onClick={() =>
                        navigate(`/dashboard/admin/update-product/${p.slug}`)
                      }
                      style={{ float: "right", height: "2.7rem" }}
                    >
                      Update Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
