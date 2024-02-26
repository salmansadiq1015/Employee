import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useCard } from "../../context/card";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

export default function Card() {
  const [cart, setCart] = useCard();
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total Price
  const totalPrice = () => {
    try {
      const total = cart?.reduce(
        (accumulator, item) => accumulator + item.price,
        0
      );
      return total;
      // let total = 0;
      // cart?.map((item) => {
      //   total = total + item.price;
      // });
      // return total;
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Items

  const removeItem = async (pid) => {
    try {
      let myCard = [...cart];
      let index = myCard.findIndex((item) => item._id === pid);
      myCard.splice(index, 1);
      setCart(myCard);
      toast.success("Item remove!");
      localStorage.setItem("cart", JSON.stringify(myCard));
    } catch (error) {
      console.log(error);
    }
  };

  // Get Payment Gateway Token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle Payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      if (data) {
        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success("Payment completed successfully!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"card-ecommerce"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1
              className="text-center bg-light p-2 mb-1"
              style={{
                color: "orangered",
                fontWeight: "700",
                textShadow: "-1px 1px 0px orange,-2px 2px 0px orangered",
              }}
            >
              {`Hello, ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart?.length} Products in your cart ${
                    auth?.token ? " " : "Please login to checkout"
                  } `
                : "Your card is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7" style={{}}>
            <div className="row">
              {cart?.map((p) => (
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
                    >
                      <button
                        className="button"
                        style={{ height: "2.7rem" }}
                        onClick={() => removeItem(p._id)}
                      >
                        Remove <AiFillDelete />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="col-md-5 "
            style={{
              border: "1px solid #ccc",
              boxShadow: ".3rem .3rem .3rem rgba(0,0,0,.3)",
              padding: "0",
              borderRadius: ".3rem",
            }}
          >
            <h4
              style={{
                width: "100%",
                textAlign: "center",
                padding: ".5rem 0",
                background: "orangered",
                color: "#fff",
              }}
            >
              Cart Summery
            </h4>
            <p
              style={{
                textAlign: "center",
                marginTop: ".6rem",
                fontWeight: "600",
              }}
            >
              Total | Checkout | Payment
            </p>
            <hr />
            <div
              className="details"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".8rem",
                padding: ".6rem",
              }}
            >
              <h5>
                <b>Total:</b> Rs. {totalPrice()}
              </h5>
              {auth?.user?.address ? (
                <>
                  <div>
                    <h4 style={{ fontWeight: "600", fontSize: "1.3rem" }}>
                      Current Address:{" "}
                    </h4>
                    <span style={{ fontWeight: "500", marginLeft: "4rem" }}>
                      {auth?.user?.address}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/dashboard/user/profile")}
                    className="button"
                    style={{ marginLeft: "9rem" }}
                  >
                    Update Profile
                  </button>
                </>
              ) : (
                <>
                  <div>
                    {auth?.toast ? (
                      <button
                        onClick={() => navigate("/dashboard/user/profile")}
                        className="button"
                        style={{ marginLeft: "10rem" }}
                      >
                        Update Profile
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/login", { state: "/cart" })}
                        className="button"
                        style={{ marginLeft: "7rem", width: "15rem" }}
                      >
                        Please login to checkout!
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* Payment Cart */}

              <div
                className="mt-2 mb-2"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {!clientToken || !cart.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => {
                        console.log("DropIn instance:", instance);
                        setInstance(instance);
                      }}
                    />

                    <button
                      className="btn btn-primary button"
                      onClick={handlePayment}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
