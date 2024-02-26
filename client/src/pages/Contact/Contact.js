import React, { useState } from "react";
import "./contact.css";
import Layout from "../../components/Layout/Layout";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/contact/create-message`,
        {
          name,
          email,
          phone,
          message,
        }
      );
      if (data?.success) {
        toast.success("Message send successfully!");
        // Clear Message
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Contact Us-Ecommerce Store"}>
        <div className="contact-container" style={{ userSelect: "none" }}>
          <div className="shade">
            <div className="heading">
              <span>C</span>
              <span>o</span>
              <span>n</span>
              <span>t</span>
              <span>a</span>
              <span>c</span>
              <span>T</span>
              <span>U</span>
              <span>s</span>
            </div>
            <div className="contact-content">
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name..."
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Phone..."
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                  name="message"
                  rows="10"
                  placeholder="Message..."
                  autoComplete="false"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "2.8rem",
                    background: "orangered",
                    borderRadius: ".3rem",
                    cursor: "pointer",
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#fff",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
              <div className="map">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.8547252102917!2d73.65009777473458!3d30.69436328748752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39181b4d3a8d8233%3A0xddd9c422109b2d3d!2sDepalPur%20Okara%20By%20Pass%20Road%2C%20Dipalpur%2C%20Okara%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1690192103990!5m2!1sen!2s"
                  width={600}
                  height={450}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            {/* Contact Detail */}
            <div className="contact-bottom">
              <div className="box-container">
                <div className="box">
                  <AiOutlineMail />
                  <h3>Email</h3>
                  <span>ecomstore@gmail.com</span>
                </div>
                <div className="box">
                  <BsFillTelephonePlusFill />
                  <h3>Phone</h3>
                  <span>0300-9021987</span>
                </div>
                <div className="box">
                  <FaMapLocationDot />
                  <h3>Address</h3>
                  <span>Depalpur District Okara, Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
