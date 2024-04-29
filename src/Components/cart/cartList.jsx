import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../API_URLs/api_urls";
import { stateProps } from "../../Routes/routes";
import ProductTile from "../../reusableComponent/ProductTile";
import Loader from "../../reusableComponent/Loader";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { user, theme } = useContext(stateProps);
  const [cartProducts, setCartProducts] = useState({
    total: null,
    totalDiscount: null,
    discountedTotal: null,
    selectAll: true,
    userCart: {},
    items: [],
    fetched: false,
  });
  const navigate= useNavigate();
  useEffect(() => {
    setCartProducts({
      total: null,
      totalDiscount: null,
      discountedTotal: null,
      selectAll: true,
      userCart: {},
      items: [],
      fetched: false,
    });
    if (user.isLoggedin) {
      getUserCart();
    } else {
      navigate('/');
    }
  }, [user]);

  const getUserCart = async () => {
    await axios.get(api.getCartItems(user.userName)).then((el) => {
      if (el.data.retVal >= 0) {
        Promise.all(getProducts(el))
          .then((vals) => {
            let newBill = {
              total: 0,
              totalDiscount: 0,
              discountedTotal: 0,
              selectAll: true,
            };
            const prods = vals.map((el) => el.data);
            prods.forEach(({ price, discountPercentage }) => {
              newBill.total += price;
              newBill.totalDiscount += Number(
                ((price * discountPercentage) / 100).toFixed(2)
              );
              newBill.discountedTotal = Number(
                (newBill.total - newBill.totalDiscount).toFixed(2)
              );
            });
            setCartProducts({
              ...cartProducts,
              ...newBill,
              items: prods,
              userCart: el.data.items,
              fetched: true,
            });
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const getProducts = (el) => {
    return Object.keys(el.data.items).map(async (product) => {
      return await axios
        .get(`https://dummyjson.com/products/${product}`)
        .catch((err) => console.log(err));
    });
  };

  const deleteProd = async (id) => {
    if (user.isLoggedin && id) {
      await axios
        .delete(api.delCartItems(user.userName, id))
        .then((res) => {
          getUserCart();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(
        "error while deleting item from cart",
        "user",
        user,
        "id",
        id
      );
    }
  };

  const alterQty = async (prd, qty) => {
    if (user.isLoggedin) {
      const putData = {
        user: user.userName,
        product: prd,
        qty: qty,
      };
      await axios
        .put(api.addItems, putData)
        .then((resp) => {
          // console.log(resp);
          getUserCart();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={"cartList"}>
      {cartProducts.fetched > 0 ? (
        <>
          {cartProducts.items.length ? (
            <div className="cartList_products">
              {cartProducts.items.map((el) => {
                return (
                  <ProductTile
                    product={el}
                    theme={theme}
                    cart={{
                      qty: cartProducts.userCart[el.id],
                      user: user.userName,
                      id: el.id,
                      deleteProd,
                      alterQty,
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="cart-noProds ">No products in your cart</div>
          )}

          {cartProducts.items.length ? (
            <div className="cartList_priceBar">
              <div className="totalPrice">
                <h2>{cartProducts.selectAll ? "Total" : "Subtotal"}:</h2>
                <h4
                  style={{
                    margin: "5px",
                    color: "red",
                    textDecoration: "Line-through",
                  }}
                >
                  ${cartProducts.total}
                </h4>
                <h3
                  style={{
                    margin: "5px",
                    color:
                      theme === "dark" ? "rgb(10, 167, 78)" : "rgb(9, 140, 6)",
                  }}
                >
                  ${cartProducts.discountedTotal}
                </h3>
                {cartProducts.totalDiscount > 0 && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h5>You are saving </h5>
                    <h4
                      style={{
                        margin: "5px",
                        color:
                          theme === "dark"
                            ? "rgb(10, 167, 78)"
                            : "rgb(9, 140, 6)",
                      }}
                    >
                      ${cartProducts.totalDiscount}
                    </h4>
                  </div>
                )}
                <div className="cartProductItems">
                  <h3>Items</h3>
                  {cartProducts.items.map(
                    ({ price, title, discountPercentage }) => (
                      <div className="billItem">
                        <h5 style={{ width: "60%" }}>{title}</h5>{" "}
                        <h5 style={{ width: "30%" }}>
                          $
                          {(price - (price * discountPercentage) / 100).toFixed(
                            2
                          )}
                        </h5>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div style={{ height: "90vh", width: "100%" }}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Cart;
