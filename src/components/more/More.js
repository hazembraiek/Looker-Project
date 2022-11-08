import React, { useEffect, useRef } from "react";
import test from "../../assets/icons/Setting.png";

function More({ actionsList, itemID, setMoreOpen }) {
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.id != "more") setMoreOpen(false);
    });
  }, []);
  console.log(actionsList);
  return (
    <div className="more-container" id="more">
      {actionsList?.map((action, i) => (
        <div
          id="more"
          className="more-container-item"
          key={i}
          onClick={() => action.action(itemID)}
        >
          <img id="more" src={test} alt="error" />
          <p id="more">{action.label}</p>
        </div>
      ))}
    </div>
  );
}

export default More;
