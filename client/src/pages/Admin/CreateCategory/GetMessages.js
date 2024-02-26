import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";

export default function GetMessages() {
  const [messages, setMessages] = useState([]);

  // Get Messages
  const getMessages = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/contact/get-message`
      );
      setMessages(data?.Messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  //   Delete Message
  const deleteMessage = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/contact/delete-message/${id}`
      );
      if (data?.success) {
        toast.success("Message deleted successfully!");
        getMessages();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Dashboard messages"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          {/* All Message Card */}
          <div className="col-md-9">
            <h1>Customer Messages </h1>
            <div className="m-1 w-75">
              {/* Message table */}
              <table
                className="table"
                style={{
                  border: "2px solid orangered",
                  borderCollapse: "collapse",
                  width: "100%",
                  margin: "20px 0",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={{
                        padding: "10px",
                        background: "#f2f2f2",
                        border: "2px solid orangered",
                      }}
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      style={{
                        padding: "10px",
                        background: "#f2f2f2",
                        border: "2px solid orangered",
                      }}
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      style={{
                        padding: "10px",
                        background: "#f2f2f2",
                        border: "2px solid orangered",
                      }}
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      style={{
                        padding: "10px",
                        background: "#f2f2f2",
                        border: "2px solid orangered",
                      }}
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      style={{
                        padding: "10px",
                        background: "#f2f2f2",
                        border: "2px solid orangered",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {messages?.map((m) => (
                    <tr key={m._id}>
                      <td style={{ padding: "10px", border: "1px solid #888" }}>
                        {m.name}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #888" }}>
                        {m.email}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #888" }}>
                        {m.phone}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #888" }}>
                        {m.message}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #888" }}>
                        <button
                          style={{
                            padding: "5px 10px",
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          // Add hover effect
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#0056b3";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#007bff";
                          }}
                          onClick={() => deleteMessage(m._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
