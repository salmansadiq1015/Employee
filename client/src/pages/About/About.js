import React from "react";
import "./about.css";
import Layout from "../../components/Layout/Layout";
import about from "../../images/about.jpg";

export default function About() {
  return (
    <Layout title={"About Us-Ecommerce Store"} keywords={"#about ecommerce "}>
      <div className="about-container">
        <div className="heading">
          <span>A</span>
          <span>b</span>
          <span>o</span>
          <span>u</span>
          <span>t</span>
          <span>U</span>
          <span>s</span>
        </div>

        <h3>
          {" "}
          -:(Your satisfaction, our priority - Join thousands of satisfied
          customers who trust us to provide an unforgettable shopping adventure,
          every time ):-
        </h3>
        <div className="about-content">
          <div className="image">
            <img src={about} alt="about-img" />
          </div>
          <div className="about-content-box">
            <h3>"Shop till you drop, then pick it up again!"</h3>
            <p>
              Welcome to our innovative online marketplace, where shopping meets
              convenience and satisfaction. Discover a curated selection of
              premium products tailored to your desires, all just a click away.
              With our commitment to excellence, seamless browsing, and prompt
              delivery, we ensure your shopping experience is nothing short of
              exceptional. Embrace the future of shopping with us and elevate
              your lifestyle today.
            </p>
            <button>Read More</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
