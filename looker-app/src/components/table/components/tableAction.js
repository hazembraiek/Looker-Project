import React, { useState } from "react";
import More from "../../more/More";
import moreIcon from "./../../../assets/icons/More.png";

function TableAction({ tableActions, data }) {
  const [moreOpen, setMoreOpen] = useState(false);

  const openMoreSection = () => {
    setMoreOpen(!moreOpen);
  };

  return (
    <>
      <div className="tableIcons moreIcon" id="more" onClick={openMoreSection}>
        <img src={moreIcon} id="more" />
      </div>
      {moreOpen && (
        <More
          actionsList={tableActions}
          itemID={data}
          setMoreOpen={setMoreOpen}
          open={moreOpen}
        />
      )}
    </>
  );
}

export default TableAction;
