import React, { createContext } from "react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";
// import Products from "../Components/products/productCatalogue";
// import ProductView from "../Components/products/ProductView";
import Loader from "../reusableComponent/Loader";
import Login from "../Components/user/Login";
import { USER_ACTION } from "../App";
const Products = lazy(() => import("../Components/products/productCatalogue"));
const ProductView = lazy(() => import("../Components/products/ProductView"));
const Cart = lazy(() => import("../Components/cart/cartList"));
// import Login from "../Components/user/Login.Js";

export const stateProps = createContext();
function Routing({
  theme,
  setTheme,
  data,
  handleSearch,
  searchValue,
  filteredProducts,
  user,
  setUser,
  // USER_ACTION,
}) {
  const handleClose = () => {
    // console.log('heyy');
    setUser({
      type: USER_ACTION.CLOSE,
    });
  };
  const handleToggleuserAction = (action, uName) => {
    setUser({
      type: action,
      uName: uName,
    });
  };
  return (
    <stateProps.Provider
      value={{
        theme,
        handleClose,
        open: user.action,
        action: user.action,
        setAction: handleToggleuserAction,
        setTheme,
        handleSearch,
        user,
        setUser,
        USER_ACTION,
        search: searchValue,
        prods: filteredProducts,
        categories: data.categories,
      }}
    >
      <div className={`home home-${theme}`}>
        <Login />
        <Navbar />
        <div style={{ overflow: "scroll", height: "93%" }} className="contents">
          {data.status ? (
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loader />}>
                    <Products />
                  </Suspense>
                }
              />
              <Route
                path={"/product/:id/:desc"}
                element={
                  <Suspense fallback={<Loader />}>
                    <ProductView />
                  </Suspense>
                }
              />
              <Route
                path={"/cart"}
                element={
                  <Suspense fallback={<Loader />}>
                    <Cart />
                  </Suspense>
                }
              />
            </Routes>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </stateProps.Provider>
  );
}

export default Routing;
