import React, { useEffect, useState } from "react";
import "./create.css";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/Form/CategoryForm";
import { Modal } from "antd";

export default function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Handle form
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created 😎`);
        getAllCategories();
        setName("");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while creating categoty!");
    }
  };

  // Delete Cateries
  const deleteCategories = async (cid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/category/delete-category/${cid}`
      );
      if (data?.success) {
        toast.success(`${data?.message}`);
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while delete category!");
    }
  };

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

  // Update Category

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated!`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in update category!");
    }
  };

  // HANDLE Model
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  // Return Statement
  return (
    <Layout title={"Dashboard Create-Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 categoryItems ">
            <h1>Manage Category</h1>
            <div className="">
              <CategoryForm
                value={name}
                setValue={setName}
                handleForm={handleForm}
              />
            </div>
            <div className="">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={{ background: "#111", color: "#fff" }}
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      style={{ background: "#111", color: "#fff" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <>
                      <tr key={category._id}>
                        <td>{category.name}</td>

                        <td className="buttons">
                          <button
                            type="button"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(category.name);
                              setSelected(category);
                            }}
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              deleteCategories(category._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <>
              <Modal
                title="Basic Modal"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
              >
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleForm={handleUpdate}
                />
              </Modal>
            </>
          </div>
        </div>
      </div>
    </Layout>
  );
}
