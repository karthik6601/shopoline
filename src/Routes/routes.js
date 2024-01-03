import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Products from "../Components/products";
function Routing({ theme, setTheme, data }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data.status) {
      // console.log(data.products);
      setProducts([...data.products]);
    }
  }, [data]);
  return (
    <div className={`home ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <div style={{ overflow: "scroll", height: "92%" }} className="contents">
        <Routes>
          <Route
            path="/"
            element={<Products theme={theme} prods={products} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Routing;
