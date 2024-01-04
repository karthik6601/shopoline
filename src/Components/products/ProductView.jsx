import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  return (
    <>
      {product.title && (
        <div className="productView">
          <div className="productHead">
            <h2>{product.title}</h2>
          </div>
          <div>
            
          </div>
        </div>
      )}
    </>
  );
}

export default ProductView;
