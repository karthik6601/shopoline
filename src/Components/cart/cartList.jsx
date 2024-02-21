import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../API_URLs/api_urls";
import { stateProps } from "../../Routes/routes";
import ProductTile from "../../reusableComponent/ProductTile";

function Cart() {
  const { user, theme } = useContext(stateProps);
  const [cartProducts, setCartProducts] = useState({
    total: null,
    totalDiscount: null,
    discountedTotal: null,
    selectAll: true,
    items: [],
  });
  useEffect(() => {
    if (user.isLoggedin) {
      axios.get(api.getCartItems(user.userName)).then((el) => {
        // console.log("api triggered");
        if (el.data.items) {
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
              // setItems(prods);
              setCartProducts({
                ...cartProducts,
                ...newBill,
                items: prods,
              });
            })
            .catch((err) => console.log(err));
          // console.log(prods)
        }
      });
    }
  }, [user]);

  useEffect(() => {
    console.log("hello", cartProducts);
  }, [cartProducts.items]);

  const getProducts = (el) => {
    return Object.keys(el.data.items).map(async (product) => {
      return await axios
        .get(`https://dummyjson.com/products/${product}`)
        .catch((err) => console.log(err));
    });
  };

  return (
    <div className={"cartList"}>
      {cartProducts.items.length > 0 && (
        <>
          <div className="cartList_products">
            {cartProducts.items.map((el) => {
              return <ProductTile product={el} theme={theme} />;
            })}
          </div>
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
                {cartProducts.items.map(({ price, title, discountPercentage }) => (
                  <div className="billItem">
                    <h5>{title.slice(0,25)+`${title.length > 24 && '..'}`}</h5> <h5>{price-(price* discountPercentage/100)}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
