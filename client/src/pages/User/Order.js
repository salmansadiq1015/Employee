import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  console.log("Orders", orders);

  // Get All Orders
  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);
  return (
    <Layout title={"Dashboard - Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
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
                      </tr>
                    </thead>
                    <tbody style={{ border: "2px solid #222" }}>
                      <tr>
                        <td style={{ border: "1px solid #222" }}>{i + 1}</td>
                        <td style={{ border: "1px solid #222" }}>
                          {o?.status}
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
                              <div
                                className="col-md-2"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
