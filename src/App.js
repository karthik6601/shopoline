import "./App.css";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Routing from "./Routes/routes";

function App() {
  const [data, setData] = useState({
    status: false,
    products: [],
    categories: [],
    meta: {},
  });
  const [searchValue, SetSearchValue] = useState('');
  const [filteredCategory, setFilteredCategory]=useState();
  const [sortKey, setSortKey] = useState()
  const [theme, setTheme] = useState("light");

  const filteredProducts=useMemo(()=>{
    return data.products.filter((product)=>{
      return (product.title.toLowerCase().includes(searchValue.toLowerCase()) || 
      product.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.category.toLowerCase().includes(searchValue.toLowerCase())
      )
    })
  },[searchValue, data])


  useEffect(() => {
    console.log(filteredProducts)
  }, [filteredProducts]);
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
          // let a=-1;
          // let b=10;
          // res.data.products.forEach(element => {
          //   a=element.stock>a ? element.stock: a;
          //   b=element.stock<b ? element.stock: b;
          // });
          // console.log(a,b);
          // console.log(categories);
          const response = {
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

  const handleSearch = (value) => {
    SetSearchValue(value);
  };

  return (
    <div>
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
