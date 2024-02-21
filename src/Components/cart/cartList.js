import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../API_URLs/api_urls";
import { stateProps } from "../../Routes/routes";

function Cart() {
  const { user } = useContext(stateProps);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (user.isLoggedin) {
      axios.get(api.getCartItems(user.userName)).then((el) => {
        // console.log("api triggered");
        if (el.data.items) {
          Promise.all(getProducts(el))
            .then((vals) => {
              setItems(vals.map((el) => el.data));
            })
            .catch((err) => console.log(err));
          // console.log(prods)
        }
      });
    }
  }, [user]);
  
  useEffect(()=>{
    console.log('hello', items) 
  },[items])

  const getProducts = (el) => {
    return Object.keys(el.data.items).map(async (product) => {
      return await axios
        .get(`https://dummyjson.com/products/${product}`)
        .catch((err) => console.log(err));
    });
  };

  return (
    <div className={"cartList"}>
      <div className="cartList_products"></div>
      <div className="cartList_priceBar"></div>
    </div>
  );
}

export default Cart;
