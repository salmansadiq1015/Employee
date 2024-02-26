import React, { useEffect, useState } from "react";
import "./Product.css";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

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
      toast.error("Get all category error!");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Create Product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("photo", photo);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Fill all the field!");
    }
  };

  return (
    <Layout title={"Dashboard Create-Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                style={{ border: "2px solid orangered" }}
                placeholder="Select a Category"
              >
                <option selected>Select a Category </option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="mb-3 ">
                <label
                  htmlFor="upload-image"
                  className="btn btn-outline-secondary col-md-12"
                >
                  {photo ? photo.name : "Upload Image"}
                  <input
                    type="file"
                    id="upload-image"
                    style={{ display: "none" }}
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                    required
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product_Photo"
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control w-100"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control w-100"
                  style={{ height: "7rem", resize: "none" }}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control w-100"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Product Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-control w-100"
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  size="large"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                  className="form-select mb-3 w-100"
                  required
                >
                  <option selected>Select Shipping</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div className="mb-3">
                <button onClick={handleCreate} className="button">
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
