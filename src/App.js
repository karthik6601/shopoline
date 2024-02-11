import "./App.css";
import axios from "axios";
import { useEffect, useMemo, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Routing from "./Routes/routes";

export const USER_ACTION={
  REG:'reg',
  LOGIN:'login',
  LOGGED_IN:'logged_in',
  LOGGED_OUT:'logged_out',
  CLOSE:null
};
const updateUser = (userData, action) => {
  switch (action.type) {
    case USER_ACTION.REG:
      return {...userData, action:USER_ACTION.REG};
    case USER_ACTION.LOGIN:
      return {...userData, action:USER_ACTION.LOGIN};
    case USER_ACTION.CLOSE:
      return {...userData, action:USER_ACTION.CLOSE}
    case USER_ACTION.LOGGED_IN:
      return {...userData, isLoggedin:true};
    case USER_ACTION.LOGGED_OUT:
      return {...userData, isLoggedin:false};
    default:
      return userData;
  }
};
function App() {
  const [data, setData] = useState({
    status: false,
    products: [],
    categories: [],
    meta: {},
  });
  const [searchValue, SetSearchValue] = useState("");
  const [user, setUser] = useReducer(updateUser, {
    isLoggedin: false,
    userID: "",
    action: null,
  });
  const [sortKey, setSortKey] = useState();
  const [theme, setTheme] = useState("light");

  const filteredProducts = useMemo(() => {
    return data.products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.description
          .split("/[s,]+/")
          .map((el) => el.toLowerCase())
          .includes(searchValue.toLowerCase()) ||
        product.category.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }, [searchValue, data]);

  const location = useLocation(),
    navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      await axios
        .get(
          // "https://api.slingacademy.com/v1/sample-data/products?offset=0&limit=100"
          `https://dummyjson.com/products?limit=100`,
          { signal }
        )
        .then((res) => {
          const categories = res.data.products.reduce((cat, items) => {
            !cat.includes(items.category) && cat.push(items.category);
            return cat;
          }, []);
          const response = {
            status: true,
            products: res.data.products,
            categories: categories,
            meta: {
              total: res.data.total,
              loaded: res.data.limit,
            },
          };
          setData(response);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    setTimeout(() => {
      fetchData();
    }, 2000);

    return () => controller.abort();
  }, []);

  const handleSearch = (value) => {
    // console.log(location, navigate)
    SetSearchValue(value);
    if (!location.pathname.includes("products")) {
      navigate("/");
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Routing
        theme={theme}
        data={data}
        filteredProducts={filteredProducts}
        setTheme={setTheme}
        searchValue={searchValue}
        handleSearch={handleSearch}
        user={user}
        setUser={setUser}
        USER_ACTION={USER_ACTION}
      />
    </div>
  );
}

export default App;
