import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <Layout title={"Page-not-found"}>
        <div className="pagenotFound">
          <h1>Page Not Found</h1>
          <h3>Oops ! Page Not Found 🥵</h3>
          <Link to="/">Go Back</Link>
        </div>
      </Layout>
    </>
  );
}
