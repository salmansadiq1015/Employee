import React, { useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import {
  AiFillLinkedin,
  AiFillFacebook,
  AiFillYoutube,
  AiTwotoneHome,
} from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareWhatsapp, FaLocationDot } from "react-icons/fa6";
import { GiModernCity } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { FcAbout, FcShop, FcContacts } from "react-icons/fc";
import { MdPolicy } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import Logo from "../../images/logo.png";
import { toast } from "react-toastify";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    toast.success("Email sending successfully!", {
      theme: "dark",
      position: "top-center",
    });
  };

  // Retrun statemant
  return (
    <div className="footer-container ">
      <div className="footer-context">
        <div className="left-area">
          <h3>Contact</h3>
          <ul>
            <li>
              <GiModernCity /> Depalpur, Okara
            </li>
            <li>
              <FaLocationDot />
              Okara, Pakistan
            </li>
            <li>
              <CgWebsite />
              <Link to="https://salmansadiq.netlify.app/" target="blank">
                www.masterjs.com
              </Link>
            </li>
            <li>
              {" "}
              <BsFillTelephoneForwardFill /> 0344-0401414
            </li>
          </ul>
        </div>
        <div className="right-area">
          <h3>Useful Links</h3>
          <ul>
            <Link to="/">
              <li>
                <AiTwotoneHome color="rgb(255, 0, 85)" />
                Home
              </li>
            </Link>
            <Link to="/about">
              <li>
                <FcAbout />
                About
              </li>
            </Link>
            <Link to="/products">
              <li>
                <FcShop />
                All Products
              </li>
            </Link>
            <Link to="/policy">
              <li>
                <MdPolicy color="rgb(0, 184, 0)" />
                Policy
              </li>
            </Link>
            <Link to="/contact">
              <li>
                <FcContacts />
                Contact
              </li>
            </Link>
          </ul>
        </div>
        <div className="newsletter">
          <h3>Newsletter</h3>
          <form className="inputbox" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">
              Send <IoSendSharp />
            </button>
          </form>
          <div className="icons">
            <Link to="">
              <AiFillLinkedin color="rgb(0, 110, 255)" />
            </Link>
            <Link to="">
              <AiFillFacebook color="rgb(4, 0, 255)" />
            </Link>
            <Link to="">
              <FaInstagramSquare color="rgb(255, 0, 149)" />
            </Link>
            <Link to="">
              <AiFillYoutube color="rgb(255, 0, 0)" />
            </Link>
            <Link to="">
              <FaSquareWhatsapp color="rgb(0, 245, 0)" />
            </Link>
          </div>
        </div>
        {/*  */}
      </div>
      {/*  */}
      <div className="footer-bottom">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>
        <h3>
          Created by{" "}
          <Link to="https://salmansadiq.netlify.app/" target="blank">
            Master-JS
          </Link>{" "}
          &copy; | All right reserved 2023
        </h3>
      </div>
    </div>
  );
}
