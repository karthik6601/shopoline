import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Routing from "./Routes/routes";

function App() {
  const [data, setData] = useState({
    status: false,
    products: [],
    categories: [],
    meta: {},
  });
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    // console.log(data)
  }, [data]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          // "https://api.slingacademy.com/v1/sample-data/products?offset=0&limit=100"
          `https://dummyjson.com/products?limit=100`
        )
        .then((res) => {
          const categories = res.data.products.reduce((cat, items) => {
            !cat.includes(items.category) && cat.push(items.category);
            return cat;
          }, []);
          // console.log(categories);
          const response={
            status: true,
            products: res.data.products,
            categories: categories,
            meta: {
              total: res.data.total,
              loaded: res.data.limit,
            },
          };
          console.log(response);
          setData(response);
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      <Routing theme={theme} data={data} setTheme={setTheme} />
    </div>
  );
}

export default App;
