import React from "react";
import "./category.css";
import Layout from "../../components/Layout/Layout";
import useCategory from "../../hooks/useCategory";
import { Link } from "react-router-dom";

export default function Categories() {
  const categories = useCategory();
  return (
    <Layout
      title={"Categories Us-Ecommerce Store"}
      keywords={"#categories ecommerce "}
    >
      <div className="all-category-container">
        <h1>All Categories</h1>
        <div className="category-clist">
          {categories?.map((c) => (
            <h6 key={c._id}>
              <Link to={`/category/${c.slug}`}>{c.name}</Link>
            </h6>
          ))}
        </div>
      </div>
    </Layout>
  );
}
