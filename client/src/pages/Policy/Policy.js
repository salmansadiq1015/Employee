import React from "react";
import "../About/about.css";
import Layout from "../../components/Layout/Layout";
import policy from "../../images/contact.jpg";

export default function Policy() {
  return (
    <Layout title={"Policy Ecommerce-Store"}>
      <div className="about-container">
        <div className="heading">
          <span>P</span>
          <span>o</span>
          <span>l</span>
          <span>i</span>
          <span>c</span>
          <span>y</span>
          <span>s</span>
        </div>

        <h3>
          {" "}
          -:("Shop with confidence - our commitment to privacy ensures a safe
          and secure experience."):-
        </h3>
        <div className="about-content">
          <div className="image">
            <img src={policy} alt="about-img" />
          </div>
          <div className="about-content-box">
            <h3>
              "Your privacy is our priority - trust us to protect your personal
              information securely."
            </h3>
            <p>
              Our privacy policy ensures the security and confidentiality of
              customer information. We collect and use data solely for improving
              shopping experiences and order processing. Personal details are
              not shared with third parties unless required by law. Customers
              retain the right to access, correct, or delete their data. We
              prioritize safeguarding sensitive information and maintaining a
              trustworthy environment for all users.
            </p>
            <button>Read More</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
