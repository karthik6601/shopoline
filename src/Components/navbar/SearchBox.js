import React from "react";

function searchBox({ handleSearch }) {
  const debouncer=()=>{
    let timer;
    return (value)=>{
      timer && clearTimeout(timer);
      timer=setTimeout(()=>{
        handleSearch(value);
        // console.log(value);
      }, 800);
    }
  }
  const debouncedValue=debouncer();
  return (
    <div style={{width:'100%', height:'100%', display:'flex', justifyContent:"center"}}>
      <input
        type="text"
        className="searchProducts"
        placeholder="search products"
        onChange={(e) => {
          debouncedValue(e.target.value);
        }}
      />
    </div>
  );
}

export default searchBox;
