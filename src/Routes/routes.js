import React, { useEffect, useState } from "react";
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";
import Products from "../Components/products/productCatalogue";
import ProductView from "../Components/products/ProductView";
import Loader from "../reusableComponent/Loader";
import Login from "../Components/user/Login";
// import Login from "../Components/user/Login.Js";
function Routing({ theme, setTheme, data, handleSeach, searchValue, filteredProducts, user, setUser }) {
  const handleClose=()=>{
    // console.log('heyy');
    setUser({
      ...user,
      action:''
    })
  }
  const handleToggleuserAction=(action)=>{
    setUser({
      ...user, action:action
    });
  }
  return (
    <div className={`home ${theme}`} >
      <Login open={user.action.length > 0} handleClose={handleClose} theme={theme} action={user.action} setAction={handleToggleuserAction}/>
      <Navbar theme={theme} setTheme={setTheme} handleSearch={handleSeach} user={user} setUser={setUser} />
      <div style={{ overflow: "scroll", height: "93%" }} className="contents">
        {data.status ? <Routes>
          <Route
            path="/"
            element={<Products theme={theme} prods={filteredProducts} categories={data.categories} search={searchValue}/>}
          />
          <Route path={"/product/:id/:desc"} element={<ProductView theme={theme} user={user}/>}/>
        </Routes>
        :
        <Loader theme={theme}/>
        }
      </div>
    </div>
  );
}

export default Routing;
