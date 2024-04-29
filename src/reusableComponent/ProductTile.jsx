import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash } from "lucide-react";
import { IconButton } from "@mui/material";

function ProductTile({ product, theme, cart }) {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const navigateToProductPage = () => {
    navigate(`/product/${product.id}/${product.title}`);
  };

  useEffect(() => {
    cart && setQuantity(cart.qty);
  }, []);

  const debouncedIncApiTrigger=()=>{
    let timer;
    return (value)=>{
      timer && clearTimeout(timer);
      timer=setTimeout(()=>{
        cart.alterQty(cart.id, value+1);
      }, 800);
    }
  }
  const debouncedIncCall=debouncedIncApiTrigger();
  const debouncedDecApiTrigger=()=>{
    let timer;
    return (value)=>{
      timer && clearTimeout(timer);
      timer=setTimeout(()=>{
        cart.alterQty(cart.id, value-1);
      }, 800);
    }
  }
  const debouncedDecCall=debouncedDecApiTrigger();

  const alterProdQty = (action) => {
    if (action === "inc") {
      setQuantity((qty) => qty + 1);
      debouncedIncCall(quantity);
    } else {
      setQuantity((qty) => qty - 1);
      debouncedDecCall(quantity);
    }
  };

  return (
    <>
      <div className={`tile tile-${theme}`}>
        <div className="cardTitle">
          <div style={{ width: "80%" }}>
            <h3
              className={`titleText titleText-${theme}`}
              onClick={navigateToProductPage}
            >
              {product.title}
            </h3>
            <span className={"stars"}>
              <StarRating value={product.rating} size={"small"} />
            </span>
          </div>
          {cart && (
            <div
              className=""
              style={{ width: "30px", height: "10px" }}
              onClick={() => {
                cart.deleteProd(cart.id);
              }}
            >
              <IconButton>
                <Trash color="black" />
              </IconButton>
            </div>
          )}
        </div>
        <div className="card" onClick={navigateToProductPage}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="image"
          ></img>
        </div>
        <div className="content" onClick={navigateToProductPage}>
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
              $
              {product.price -
                (product.price * (product.discountPercentage / 100)).toFixed(2)}
            </h4>
          </div>
        </div>
        {product.stock <= 10 && (
          <h6 style={{ margin: "10px 20px", color: "red" }}>
            Only {product.stock} left
          </h6>
        )}
        {cart && (
          <div className="cartAction">
            <IconButton>
              <Minus onClick={() => alterProdQty("dec")} />
            </IconButton>
            {quantity}
            <IconButton>
              <Plus onClick={() => alterProdQty("inc")} />
            </IconButton>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductTile;
