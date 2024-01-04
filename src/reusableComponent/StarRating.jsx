import * as React from "react";
import Rating from "@mui/material/Rating";
// import Stack from "@mui/material/Stack";

export default function StarRating({ value, size }) {
  return (
    // <Stack spacing={1}>
    <Rating name="half-rating" size={size} style={{margin:0}} defaultValue={value} precision={0.5} readOnly />
  );
}
