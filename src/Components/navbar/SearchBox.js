import React from "react";

function searchBox({ handleSearch }) {
  return (
    <div style={{width:'100%', height:'100%', display:'flex', justifyContent:"center"}}>
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
