import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
    "Return",
  ]);
  // const [changeStatus, setChangeStatus] = useState("");
  //   Get ALl Orders
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  //   Status Change
  const handleChange = async (id, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/auth/order-status/${id}`,
        { status: value }
      );
      getAllOrders();
      if (data) {
        toast.success("Order status updated!");
      }
    } catch (error) {
      console.log(error);
      if (data) {
        toast.error("Error status updated!", { theme: "colored" });
      }
    }
  };

  // Delete Order
  const deleteOrder = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/auth/order-delete/${id}`
      );
      if (data) {
        getAllOrders();
        toast.success("Order remove successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          {/* Orders */}
          <div className="col-md-9">
            <h1
              style={{
                textAlign: "center",
                color: "orangered",
                textShadow: "-1px 1px 0px orange, -2px 2px 0px orangered",
              }}
            >
              All Orders
            </h1>
            {/* Orders Start */}
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table" style={{ border: "2px solid #222" }}>
                    <thead>
                      <tr>
                        <th scope="col" style={{ border: "1px solid #222" }}>
                          #
                        </th>
                        <th scope="col" style={{ border: "1px solid #222" }}>
                          Status
                        </th>
                        <th scope="col" style={{ border: "1px solid #222" }}>
                          Buyer
                        </th>
                        <th scope="col" style={{ border: "1px solid #222" }}>
                          Date
                        </th>
                        <th scope="col" style={{ border: "1px solid #222" }}>
                          Payment
                        </th>
                        <th scope="col" style={{ border: "1px solid #222" }}>
                          Quantity
                        </th>
                        <th scope="col" style={{ border: "1px solid #222" }}>
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ border: "2px solid #222" }}>
                      <tr>
                        <td style={{ border: "1px solid #222" }}>{i + 1}</td>
                        <td style={{ border: "1px solid #222" }}>
                          <select
                            onChange={(e) =>
                              handleChange(o._id, e.target.value)
                            }
                            border="none"
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <option
                                key={i}
                                value={s}
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td style={{ border: "1px solid #222" }}>
                          {o?.buyer?.name}
                        </td>
                        <td style={{ border: "1px solid #222" }}>
                          {moment(o?.createdAt).fromNow()}
                        </td>
                        <td style={{ border: "1px solid #222" }}>
                          {o?.payment?.success ? "Success" : "Failed"}
                        </td>
                        <td style={{ border: "1px solid #222" }}>
                          {o?.products?.length}
                        </td>
                        <td
                          style={{
                            border: "1px solid #222",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteOrder(o._id)}
                        >
                          <AiFillDelete size={24} color="orangered" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <div className="col-md-7" style={{}}>
                      <div className="row">
                        {o?.products?.map((p, i) => (
                          <div
                            className="card mb-3"
                            style={{
                              maxWidth: 650,
                              padding: ".8rem",
                              boxShadow: ".3rem .3rem .3rem rgba(0,0,0,.3)",
                            }}
                          >
                            <div className="row g-0">
                              <div
                                className="col-md-2"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                                  className="img-fluid rounded-start"
                                  alt={p.name}
                                  style={{ width: "6rem", height: "6rem" }}
                                />
                              </div>
                              <div
                                className="col-md-6"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <div className="card-body">
                                  <h4 className="card-title">{p.name}</h4>
                                  <p className="card-text">
                                    <b>Price: </b>Rs.
                                    {p.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Order End */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
