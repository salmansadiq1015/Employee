import React from "react";

export default function CategoryForm({ handleForm, value, setValue }) {
  return (
    <div className=" mb-5">
      <form onSubmit={handleForm}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ height: "4rem", fontSize: "1rem", fontWeight: "400" }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add New
        </button>
      </form>
    </div>
  );
}
