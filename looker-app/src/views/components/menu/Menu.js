import React, { useEffect, useState } from "react";
import addIcon from "./../../../assets/icons/Add.png";
import filterIcon from "./../../../assets/icons/Setting.png";
import columnIcon from "./../../../assets/icons/Columns.png";
import settingIcon from "./../../../assets/icons/Setting - 2.svg";
import Button from "../../../components/button/Button";
// import GlobalFilter from "../../../components/GlobalFilter/GlobalFilter";
// import GlobalColumnControll from "../../../components/GlobalColumnControll/GlobalColumnControll";

function Menu({
  title,
  description,
  number = 0,
  switchList = [],
  labelButton,
  onClick,
  setActive,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [columnOpen, setColumnOpen] = useState(false);
  return (
    <div
      className="menu"
      style={{
        paddingBottom: switchList?.length > 0 ? "0" : "16px",
      }}
    >
      <div className="menu__first-section">
        <div className="menu__first-section-header">
          <p>{title}</p>
        </div>
        <div className="menu__first-section-listType">
          <p>{description}</p>
          <span>{number}</span>
        </div>
        {switchList?.length > 0 && (
          <div className="menu__first-section-switch-list">
            <ul>
              {switchList?.map((item, i) => {
                return (
                  <li
                    key={item._id}
                    className={item.active ? "activeList" : ""}
                    onClick={() => {
                      setActive(item._id);
                    }}
                  >
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="menu-second-section">
        <div
          className="menu-second-section-buttons"
          style={{ paddingBottom: switchList?.length > 0 ? "14px" : "0" }}
        >
          {/* {order && (
            <div className="order">
              <Button icon={settingIcon} label="Save Order" onClick={onOrder} />
            </div>
          )} */}
          {/* {columnFields?.length > 0 && (
            <div className="order filter">
              <Button
                icon={columnIcon}
                label="Columns"
                onClick={() => setColumnOpen(!columnOpen)}
              />
              {columnOpen && (
                <GlobalColumnControll
                  columnFields={columnFields}
                  setSelectedFields={setColumns}
                />
              )}
            </div>
          )} */}
          {/* {filter && (
            <div className="order filter">
              <Button
                icon={filterIcon}
                label="Filter"
                onClick={() => setFilterOpen(!filterOpen)}
              />
              {filterOpen && <GlobalFilter filterFields={filterFields} />}
            </div>
          )} */}
          {labelButton && (
            <Button
              icon={addIcon}
              label={labelButton}
              onClick={() =>
                onClick("test", "create admin", "create new admin")
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
