import React, { useMemo, useRef, useState, useContext } from "react";
import {
  ChevronDownCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MenuButton from "../../reusableComponent/menuButton";
import ProductTile from "../../reusableComponent/ProductTile";

// import Position from "rsuite/esm/Overlay/Position";
import { stateProps } from "../../Routes/routes";

function Products() {
  const { theme, prods, categories, search } = useContext(stateProps);
  const [selectedCategory, setSelectedCategory] = useState([]);
  // const [preview, setPreview] = useState({
  //   open: false,
  //   product: 0,
  // });

  const catRef = useRef();

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

  

  // const handlePreviewClose = () => {
  //   setPreview((prev) => (prev.open = false));
  // };

  // const handlePreviewOpen = (id) => {
  //   setPreview({ open: true, product: id });
  // };

  const handleCategorySelect = (category) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory((prev) => prev.filter((el) => el !== category));
    } else {
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
    <div className="product-content">
      {(search?.length === 0 ? true : selectedCategory.length > 0) && (
        <div className="categories">
          <div style={{ display: "flex", marginTop: "10px" }}>
            <h4>Browse through products under each category</h4>
            <MenuButton
              label={
                <ChevronDownCircle
                  className="ChevronDownCircle"
                  size={"18px"}
                />
              }
              options={options}
              theme={theme}
            />
          </div>

          <div className="category-tiles">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                catRef.current.scrollLeft -= window.innerWidth;
              }}
            >
              <ChevronLeft />
            </div>
            <div className="categoryContainer" ref={catRef}>
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
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                catRef.current.scrollLeft += window.innerWidth;
              }}
            >
              <ChevronRight />
            </div>
          </div>
        </div>
      )}
      <div className={`products ${theme}`}>
        {filteredProducts.length > 0 &&
          filteredProducts.map((el) => {
            return (
              <ProductTile product={el} theme={theme}/>
            );
          })}
      </div>
    </div>
  );
}

export default Products;
