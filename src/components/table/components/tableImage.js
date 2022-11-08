import React from "react";

function TableImage({ column, data }) {
  const src = data[column.value];
  const className = column?.className || "";
  return <img src={src} className={className} />;
}

export default TableImage;
