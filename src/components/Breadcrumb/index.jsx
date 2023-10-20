import React from "react";

const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Product
          </li>
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
