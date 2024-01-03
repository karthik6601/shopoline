import React, { useEffect } from "react";

function Products({ theme, prods }) {
  useEffect(() => {
    // console.log("new prods", prods);
  }, [prods]);
  return (
    <div className={`products ${theme}`}>
      {prods.length > 0 &&
        prods.map((el) => {
          return (
            <div className={`tile tile-${theme}`}>
              <div className="card">
                <img
                  src={el.thumbnail}
                  alt={"image"}
                  className="image"
                ></img>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Products;
