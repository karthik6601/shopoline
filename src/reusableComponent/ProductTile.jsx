import React from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";

function ProductTile({ product, theme }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`tile tile-${theme}`}
        key={product.id}
        onClick={() => {
          navigate(`/Shopoline/product/${product.id}/${product.title}`);
        }}
      >
        <div className="cardTitle">
          <h3 className={`titleText titleText-${theme}`}>{product.title}</h3>
          <span className={"stars"}>
            <StarRating value={product.rating} size={"small"} />
          </span>
        </div>
        <div className="card">
          <img src={product.thumbnail} alt={product.title} className="image"></img>
        </div>
        <div className="content">
          <p className={`p-${theme}`}>{product.description}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h5
              style={{
                textDecoration: "line-through",
                color: theme === "dark" ? "white" : "gray",
              }}
            >
              ${product.price}
            </h5>
            <h4 style={{ margin: "0px 5px", color: "black" }}>
              ${(product.price-(product.price * (product.discountPercentage / 100)).toFixed(2))}
            </h4>
          </div>
        </div>
        {product.stock <= 10 && (
          <h6 style={{ margin: "10px 20px", color: "red" }}>
            Only {product.stock} left
          </h6>
        )}
      </div>
    </>
  );
}

export default ProductTile;
