import React, {  useMemo, useState } from "react";
import StarRating from "../../reusableComponent/StarRating";
import { ChevronDownCircle, XCircle } from "lucide-react";
import MenuButton from "../../reusableComponent/menuButton";
// import PlaceholderGraph from "rsuite/esm/Placeholder/PlaceholderGraph";
import { useNavigate } from "react-router-dom";
// import PreviewProduct from "./ProductPreview";

function Products({ theme, prods, categories }) {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [preview, setPreview]= useState({
    open:false,
    product:0
  });

  const filteredProducts= useMemo(()=>{
    return selectedCategory.length > 0
    ? prods.filter((el) => {
        return selectedCategory.includes(el.category);
      })
    : prods;
  },[selectedCategory,prods])
  
  const navigate=useNavigate();

  const handlePreviewClose=()=>{
    setPreview(prev=> prev.open=false);
  }

  const handlePreviewOpen=(id)=>{
    setPreview({open:true, product:id});
  }

  const options = [
    ...categories.map((el) => {
      return {
        name: el,
        close: false,
        handleClickOption: (category) => {
          setSelectedCategory([...selectedCategory, category]);
        },
      };
    }),
  ];
  
  return (
    <div>
      <div className="categories">
        <h4>Browse through products under each category</h4>
        <MenuButton
          label={
            <ChevronDownCircle className="ChevronDownCircle" size={"18px"} />
          }
          options={options}
          theme={theme}
        />
        <div style={{ display: "flex" }}>
          {selectedCategory.map((el,i) => {
            return (
              <div className="chip" key={i}>
                <span
                  style={{ marginBottom: "2px", textTransform: "capitalize" }}
                  key={i}
                >
                  {el}
                </span>
                <XCircle
                  size={16}
                  key={i}
                  style={{ margin: "4px 0px 0px 4px", cursor: "pointer" }}
                  onClick={() => {
                    // console.log();
                    setSelectedCategory((prevselectedCategories) => [
                      ...prevselectedCategories.filter((category) => {
                        return category != el;
                      }),
                    ]);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={`products ${theme}`}>
        {filteredProducts.length > 0 &&
          filteredProducts.map((el) => {
            return (
                <>
              <div className={`tile tile-${theme}`} key={el.id} onClick={()=>{navigate(`/product/${el.id}/${el.title}`)}}>
                <div className="cardTitle">
                  <h3 className={`titleText titleText-${theme}`}>{el.title}</h3>
                  <span className={"stars"}>
                    <StarRating value={el.rating} size={"small"} />
                  </span>
                </div>
                <div className="card">
                  <img src={el.thumbnail} alt={"image"} className="image"></img>
                </div>
                <div className="content">
                  <p className={`p-${theme}`}>{el.description}</p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h5
                      style={{
                        textDecoration: "line-through",
                        color: theme == "dark" ? "white" : "gray",
                      }}
                    >
                      ${el.price}
                    </h5>
                    <h4 style={{ margin: "0px 5px", color: "black" }}>
                      ${(el.price * (el.discountPercentage / 100)).toFixed(2)}
                    </h4>
                  </div>
                </div>
                {el.stock <= 10 && (
                  <h6 style={{ margin: "10px 20px", color: "red" }}>
                    Only {el.stock} left
                  </h6>
                )}
              </div>
                </>
            );
          })}
      </div>
    </div>
  );
}

export default Products;
