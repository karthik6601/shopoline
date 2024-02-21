import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import StarRating from "../../reusableComponent/StarRating";
import { Link, ShoppingBag, ShoppingCart } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { stateProps } from "../../Routes/routes";
import { api } from "../../API_URLs/api_urls";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

function ProductView() {
  const { theme, user } = useContext(stateProps);
  const [currentImage, setCurrentImage] = useState(0);
  const location=useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [notify, setNotify] = useState({
    open: false,
    message: null,
    transistion: null,
  });

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
      //   console.log(res.data.images);
      setProduct(res.data);
    });
  }, [id]);

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

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleNotifClose = () => {
    setNotify({
      ...notify,
      open: false,
    });
  };

  const addItemToCart = () => {
    // user, product, qty, productID
    axios
      .post(api.addItems, {
        user: user.userName,
        product: id,
        qty: 1,
        productId: id,
      })
      .then((res) => {
        console.log(res);
        setNotify({
          ...notify,
          message: "added to cart",
          open: true,
          transistion: SlideTransition,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {product.title && (
        <div className="productView">
          <div className="productHead">
            <div className="prdTitle">
              <h1>{product.title}</h1>
            </div>
            <div className="CopyLink">
              <div className="copyLinkIcon">
                <Tooltip
                  TransitionComponent={Zoom}
                  placement="top"
                  title="Copy product link"
                >
                  {/* <Heart className="hrt" color="red" /> */}
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(`http://localhost:3000${location.pathname}`);
                    }}
                  >
                    <Link className="linkIcon" />
                  </IconButton>
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
                        color: theme === "dark" ? "rgb(204, 202, 202)" : "grey",
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
                      Only {product.stock} piece{product.stock === 1 ? "" : "s"}{" "}
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
                  <Tooltip
                    title={user.isLoggedin ? "" : "Please login to continue"}
                    TransitionComponent={Zoom}
                    placement="top"
                  >
                    <div className={"buyNow bNow_" + user.isLoggedin}>
                      <ShoppingBag style={{ marginRight: "3px" }} />
                      <h4>{"Buy Now"}</h4>
                    </div>
                  </Tooltip>
                  <Tooltip
                    title={user.isLoggedin ? "" : "Please login to continue"}
                    TransitionComponent={Zoom}
                    placement="top"
                  >
                    <div
                      className={"addCart addCart_" + user.isLoggedin}
                      onClick={() => {
                        user.isLoggedin && addItemToCart();
                      }}
                    >
                      <ShoppingCart style={{ marginRight: "3px" }} />
                      <h4>{"Add to Cart"}</h4>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <Snackbar
            open={notify.open}
            message={notify.message}
            onClose={handleNotifClose}
            autoHideDuration={2000}
            TransitionComponent={notify.transistion}
          />
        </div>
      )}
    </>
  );
}

export default ProductView;
