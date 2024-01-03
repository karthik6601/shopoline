import React, { useEffect } from "react";
import StarRating from "../reusableComponent/StarRating";

function Products({ theme, prods }) {
  useEffect(() => {
    // console.log("new prods", prods);
  }, [prods]);
  return (
    <div className={`products ${theme}`}>
      {prods.length > 0 &&
        prods.map((el) => {
          return (
            <div className={`tile tile-${theme}`} key={el.id}>
              <div className="cardTitle">
                <h3 className={`titleText titleText-${theme}`}>{el.title}</h3>
                <span className={"stars"}>
                  <StarRating value={el.rating} size={"small"} />
                </span>
              </div>
              <div className="card">
                <img src={el.thumbnail} alt={"image"} className="image"></img>
              </div>
              <div className="content">
                <p className={`p-${theme}`}>{el.description}</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h5
                    style={{
                      textDecoration: "line-through",
                      color: theme == "dark" ? "white" : "gray",
                    }}
                  >
                    ${el.price}
                  </h5>
                  <h4 style={{ margin: "0px 5px", color:"black" }}>
                    ${(el.price * (el.discountPercentage / 100)).toFixed(2)}
                  </h4>
                  
                </div>
              </div>
                {el.stock <=10 && <h6 style={{margin:'10px 20px', color:'red'}}>Only {el.stock} left</h6>}
            </div>
          );
        })}
    </div>
  );
}

export default Products;
