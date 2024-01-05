import "./App.css";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Routing from "./Routes/routes";

function App() {
  const [data, setData] = useState({
    status: false,
    products: [],
    categories: [],
    meta: {},
  });
  const [searchValue, SetSearchValue] = useState("");
  // const [filteredCategory, setFilteredCategory]=useState();
  const [sortKey, setSortKey] = useState();
  const [theme, setTheme] = useState("light");

  const filteredProducts = useMemo(() => {
    return data.products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.description.split('/[\s,]+/').map((el)=>el.toLowerCase()).includes(searchValue.toLowerCase()) ||
        product.category.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }, [searchValue, data]);

  const location = useLocation(),
    navigate = useNavigate();

  useEffect(() => {
    const  controller= new AbortController();
    const signal= controller.signal;
    const fetchData = async () => {
      await axios
        .get(
          // "https://api.slingacademy.com/v1/sample-data/products?offset=0&limit=100"
          `https://dummyjson.com/products?limit=100`, {signal}
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
        }).catch((err)=>{
          console.log(err);
        });
    };
    setTimeout(()=>{
      fetchData();
    },2000)

    return ()=>controller.abort();
  }, []);

  const handleSearch = (value) => {
    // console.log(location, navigate)
    SetSearchValue(value);
    if (!location.pathname.includes("products")) {
      navigate("/");
    }
  };

  return (
    <div style={{height:'100vh', width:'100%'}}>
      <Routing
        theme={theme}
        data={data}
        filteredProducts={filteredProducts}
        setTheme={setTheme}
        searchValue={searchValue}
        handleSeach={handleSearch}
      />
    </div>
  );
}

export default App;
