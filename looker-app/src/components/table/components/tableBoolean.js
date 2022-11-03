import React from "react";
import { getString } from "../../../helpers/getString";

function TableBoolean({ column, data }) {
  const { label, className } = column[data[column.value]?.toString()] || {};

  return <div className={className}> {getString(label)}</div>;
}

export default TableBoolean;
