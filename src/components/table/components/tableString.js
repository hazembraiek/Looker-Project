import React from "react";
import { getString } from "../../../helpers/getString";

function TableString({ column, data }) {
  const str = !data[column?.value]
    ? "_"
    : !column?.nestedLabel
    ? data[column?.value] || "_"
    : data[column?.value][column.nestedLabel] || "_";

  console.log({ str, data });

  const className = column?.className || "";
  return <div className={className}>{getString(str)}</div>;
}

export default TableString;
