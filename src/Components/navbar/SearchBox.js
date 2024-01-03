import React from "react";

function searchBox({ handleSearch }) {
  return (
    <div>
      <input
        type="text"
        className="searchProducts"
        placeholder="search products"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}

export default searchBox;
