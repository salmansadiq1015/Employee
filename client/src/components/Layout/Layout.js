import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

export default function Layout({
  children,
  title,
  description,
  keywords,
  author,
}) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "95vh" }}>{children}</main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Ecommerce-Store",
  description:
    "Mern Stack Project with React JS, Node JS, Express JS, MongoDB, BootStrap , CSS3, HTML5 & JavaScript ",
  keywords:
    "Ecommerce app, mern, react, node, express, javascript, css, bootstrap, html5, mongodb",
  author: "Muhammad Salman",
};
