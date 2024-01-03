import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";
import Products from "../Components/products";
function Routing({ theme, setTheme, data, handleSeach, filteredProducts }) {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   if (data.status) {
  //     // console.log(data.products);
  //     setProducts([...data.products]);
  //   }
  // }, [data]);
  return (
    <div className={`home ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} handleSearch={handleSeach} />
      <div style={{ overflow: "scroll", height: "92%" }} className="contents">
        <Routes>
          <Route
            path="/"
            element={<Products theme={theme} prods={filteredProducts} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Routing;
