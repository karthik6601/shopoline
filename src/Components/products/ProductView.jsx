import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRating from "../../reusableComponent/StarRating";
import { Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
// import { red } from "@mui/material/colors";

function ProductView({ theme, user }) {
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
      //   console.log(res.data.images);
      setProduct(res.data);
    });
  }, [id]);
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  useEffect(() => {
    const img =
      currentImage < product.images?.length - 1 ? currentImage + 1 : 0;
    if (product.images) {
      // console.log(product.images[img], img);
      setTimeout(() => {
        setCurrentImage(img);
      }, 5000);
    }
  }, [currentImage, product]);

  return (
    <>
      {product.title && (
        <div className="productView">
          <div className="productHead">
            <div className="prdTitle">
              <h1>{product.title}</h1>
            </div>
            <div className="wishlist">
              <div className="wishlisticon">
                <Tooltip
                  TransitionComponent={Zoom}
                  placement="top"
                  title="Add to wishlist"
                >
                  <Heart className="hrt" color="red" />
                </Tooltip>
                {/* <p className="textHide"> Add to wishlist</p> */}
              </div>
            </div>
          </div>
          <div className="productContent">
            <div className="productImage">
              <div className="imagePreview">
                <img
                  className="currentImage"
                  src={product.images[currentImage]}
                  alt={product.title}
                />
              </div>
              <div className="allPreviewImages">
                {product.images.map((el, i) => {
                  return (
                    <img
                      key={i}
                      src={el}
                      className="previewImages"
                      alt={product.title}
                      onClick={() => {
                        setCurrentImage(i);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="prdDetails-Purchase">
              <div className="productDetails">
                <div className="productDesc">
                  <h2>{product.description}</h2>
                  <h3 style={{ marginTop: "10px" }}>
                    {"Brand: "}{" "}
                    <span
                      style={{
                        color: theme == "dark" ? "rgb(204, 202, 202)" : "grey",
                      }}
                    >
                      {product.brand}
                    </span>
                  </h3>
                </div>
                <div className="rating">
                  <StarRating value={product.rating} size={"large"} />
                  <h4
                    style={{
                      marginLeft: "10px",
                      color: theme === "dark" ? "rgb(204, 202, 202)" : "black",
                    }}
                  >
                    {product.rating}/5
                  </h4>
                </div>
                <div className="stock">
                  {product.stock < 10 && (
                    <span>
                      Only {product.stock} piece{product.stock == 1 ? "" : "s"}{" "}
                      left
                    </span>
                  )}
                </div>
                <div className="pricing">
                  <div style={{ display: "flex" }}>
                    <div>
                      <h3
                        style={{
                          textDecoration: "line-through",
                          color: "rgb(156, 154, 154)",
                        }}
                      >
                        ${product.price}
                      </h3>
                    </div>
                    <div>
                      <h2
                        style={{
                          marginLeft: "10px",
                          color:
                            theme === "dark"
                              ? "rgb(10, 167, 78)"
                              : "rgb(9, 140, 6)",
                        }}
                      >
                        $
                        {(
                          product.price *
                          (product.discountPercentage / 100)
                        ).toFixed(2)}
                      </h2>
                    </div>
                    <div className={`discountPercentage dPer-${theme}`}>
                      <h4>{`${product.discountPercentage}% off`}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="purchaseSection">
                <div className="purchase">
                  <div className="buyNow">
                    <ShoppingBag style={{ marginRight: "3px" }} />
                    <h4>{"Buy Now"}</h4>
                  </div>
                  <div className="addCart">
                    {/* <div className="addCartBtn"></div> */}
                    <ShoppingCart style={{ marginRight: "3px" }} />
                    <h4>{"Add to Cart"}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductView;
