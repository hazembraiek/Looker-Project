import React from "react";

function TableDate({ column, data }) {
  const date = data[column.value];
  const className = column?.className || "";
  return (
    <div className={className}>{new Date(date)?.toLocaleDateString()}</div>
  );
}

export default TableDate;
