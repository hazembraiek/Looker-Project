import React, { useState } from "react";

const IssueItem = ({ content, className }) => {
  const [isHover, setHover] = useState(false);
  return (
    <div className="issue__container">
      {isHover && <span>{content?.label}</span>}
      <p
        className={`${className} issue__container-content`}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {content?.label}
      </p>
    </div>
  );
};

function TableArray({ column, data }) {
  const dataArray = data[column?.value] || [];
  const className = column?.className || "";
  return (
    <div className="arrayContainer">
      {dataArray.length > 0
        ? dataArray?.map((reason) => {
            return <IssueItem content={reason} className={className} />;
          })
        : "_"}
    </div>
  );
}

export default TableArray;
