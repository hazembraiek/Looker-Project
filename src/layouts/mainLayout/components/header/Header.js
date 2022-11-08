import React, { useState } from "react";
import smallNotifIcon from "./../../../../assets/icons/smallNotif.svg";
import defaultIcon from "./../../../../assets/icons/default.png";
import logoutIcon from "./../../../../assets/icons/Turn off.png";
import { useAuth } from "../../../../context/authContext";
import Search from "../../../../components/search/Search";

function Header() {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="header">
      <Search placeholder="What you are looking for?" />
      <div className="header__user">
        <div className="header__user-notification">
          <img src={smallNotifIcon} alt="error" />
        </div>
        <div
          className="header__user-info"
          onClick={() => setDropDownOpen(!dropDownOpen)}
        >
          <div className="header__user-info-image">
            <img src={defaultIcon} alt="error" />
          </div>
          <div className="header__user-info-name">
            {dropDownOpen && (
              <div className="logout">
                <div className="logout-content" onClick={() => logout()}>
                  <img src={logoutIcon} alt="" />
                  <p>Logout</p>
                </div>
              </div>
            )}
            <p className="name">{user?.fullName}</p>
            <p className="role">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
