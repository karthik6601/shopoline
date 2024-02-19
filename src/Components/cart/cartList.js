import React, { useEffect } from "react";
import axios from "axios";

function Cart() {
  useEffect(()=>{
    axios.get(`http://localhost:1234/products/`)
  },[])

  return <div className={'cartList'}>
    <div className="cartList_products">
      
    </div>
    <div className="cartList_priceBar">

    </div>
  </div>;
}

export default Cart;

