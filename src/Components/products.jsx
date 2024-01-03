import React, { useEffect } from "react";
import StarRating from "../reusableComponent/StarRating";

function Products({ theme, prods }) {
  useEffect(() => {
    // console.log("new prods", prods);
  }, [prods]);
  return (
    <div className={`products ${theme}`}>
      {prods.length > 0 &&
        prods.map((el) => {
          return (
            <div className={`tile tile-${theme}`} key={el.id}>
              <div className="cardTitle">
                <h3 className={"titleText"}>{el.title}</h3>
                <span className={'stars'}>
                <StarRating value={el.rating} size={'small'}/>
                </span>
              </div>
              <div className="card">
                <img src={el.thumbnail} alt={"image"} className="image"></img>
              </div>
              <div className="content"></div>
            </div>
          );
        })}
    </div>
  );
}

export default Products;
