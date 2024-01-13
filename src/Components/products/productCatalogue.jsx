import React, { useEffect, useMemo, useRef, useState } from "react";
import StarRating from "../../reusableComponent/StarRating";
import { ChevronDownCircle, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import MenuButton from "../../reusableComponent/menuButton";
// import PlaceholderGraph from "rsuite/esm/Placeholder/PlaceholderGraph";
import { useNavigate } from "react-router-dom";
import Position from "rsuite/esm/Overlay/Position";
// import PreviewProduct from "./ProductPreview";

function Products({ theme, prods, categories, search }) {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [preview, setPreview] = useState({
    open: false,
    product: 0,
  });

  const catRef= useRef();

  const filteredProducts = useMemo(() => {
    return selectedCategory.length > 0
      ? prods.filter((el) => {
          return selectedCategory.includes(el.category);
        })
      : prods;
  }, [selectedCategory, prods]);

  // useEffect(()=>{
  //   console.log(catRef);
  // },[catRef.current.scrollLeft])

  const navigate = useNavigate();

  // const handlePreviewClose = () => {
  //   setPreview((prev) => (prev.open = false));
  // };

  const handlePreviewOpen = (id) => {
    setPreview({ open: true, product: id });
  };

  const handleCategorySelect = (category) => {
    if(selectedCategory.includes(category)){
      setSelectedCategory(prev=> prev.filter(el=> el!=category));
    }
    else{
      setSelectedCategory([category, ...selectedCategory]);
    }
  };

  const options = [
    ...categories.map((el) => {
      return {
        name: el,
        close: false,
        handleClickOption: (category) => {
          handleCategorySelect(category);
        },
      };
    }),
  ];

  return (
    <div>
     {((search?.length==0) ? true : selectedCategory.length > 0) && <div className="categories">
        <div style={{ display: "flex", marginTop: "10px" }}>
          <h4>Browse through products under each category</h4>
          <MenuButton
            label={
              <ChevronDownCircle className="ChevronDownCircle" size={"18px"} />
            }
            options={options}
            theme={theme}
          />
        </div>

        <div className="category-tiles">
          <div style={{cursor:'pointer'}} onClick={()=> {catRef.current.scrollLeft-= window.innerWidth}}>
            <ChevronLeft/>
          </div>
          <div className="categoryContainer"  ref={catRef}>
          {selectedCategory.map((el) => {
            return (
              <div
                className={`category-tile cTile-${theme} sTile`}
                onClick={() => {
                  handleCategorySelect(el);
                }}
              >
                {el.split("-").join(" ")}
              </div>
            );
          })}
          {categories
            .filter((el) => {
              return !selectedCategory.includes(el);
            })
            .map((el) => {
              return (
                <div
                  className={`category-tile cTile-${theme} ${
                    selectedCategory.includes(el) ? "sTile" : ""
                  }`}
                  onClick={() => {
                    handleCategorySelect(el);
                  }}
                >
                  {el.split("-").join(" ")}
                </div>
              );
            })}
          </div>
          <div style={{cursor:'pointer'}} onClick={()=> {catRef.current.scrollLeft+= window.innerWidth}}>
            <ChevronRight/>
          </div>
        </div>
      </div>}
      <div className={`products ${theme}`}>
        {filteredProducts.length > 0 &&
          filteredProducts.map((el) => {
            return (
              <>
                <div
                  className={`tile tile-${theme}`}
                  key={el.id}
                  onClick={() => {
                    navigate(`/product/${el.id}/${el.title}`);
                  }}
                >
                  <div className="cardTitle">
                    <h3 className={`titleText titleText-${theme}`}>
                      {el.title}
                    </h3>
                    <span className={"stars"}>
                      <StarRating value={el.rating} size={"small"} />
                    </span>
                  </div>
                  <div className="card">
                    <img
                      src={el.thumbnail}
                      alt={"image"}
                      className="image"
                    ></img>
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
