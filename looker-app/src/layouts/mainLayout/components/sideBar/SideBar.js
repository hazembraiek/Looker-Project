import React, { useState } from "react";
import { v4 } from "uuid";
import logoIcon from "./../../../../assets/icons/logo2.png";
import menuIcon from "./../../../../assets/icons/Menu.png";
import twoUserIcon from "./../../../../assets/icons/Two-user.png";
import SideBarItem from "../SidebarItem/SidebarItem";
import { useDispatch } from "react-redux";

const pages = [
  { id: v4(5), icon: menuIcon, label: "Dashboard", link: "/dashboard" },
  {
    id: v4(5),
    icon: twoUserIcon,
    label: "Users Type",
    routes: [
      { label: "admin", link: "/admins" },
      { label: "users", link: "/users" },
    ],
  },
  {
    id: v4(5),
    icon: twoUserIcon,
    label: "Places",
    link: "/places",
  },
  {
    id: v4(5),
    icon: twoUserIcon,
    label: "Products",
    link: "/products",
  },
  {
    id: v4(5),
    icon: twoUserIcon,
    label: "Categories",
    link: "/categories",
  },
  {
    id: v4(5),
    icon: twoUserIcon,
    label: "Suggestions",
    link: "/suggestions",
  },
];

function SideBar({ setIsOpen, isOpen }) {
  const dispatch = useDispatch();

  return (
    <div className="sidebar" id={isOpen ? "closeSideBar" : ""}>
      <div className="sidebar__content">
        <div className="sidebar__content-menu">
          <div
            className="sidebar__content-menu-logo"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <img src={logoIcon} alt="logo icon error" />
          </div>
          <div className="sidebar__content-menu-navlist">
            <ul>
              {pages.map((route, i) => {
                return (
                  <SideBarItem
                    route={route}
                    key={route.id}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                  />
                );
              })}
            </ul>
          </div>
        </div>
        {/* <div className="sidebar__content-language">
          {languageOpen && (
            <>
              <div className="sidebar__content-language-add">
                <div className="sidebar__content-language-icon">
                  <img src={addIcon} alt="error" />
                </div>
                <div className="country-name">
                  <p className="">Add new Language</p>
                </div>
              </div>
              <div className="sidebar__content-language-setting">
                <div className="sidebar__content-language-icon">
                  <img src={settingIcon} alt="error" />
                </div>
                <div className="country-name">
                  <p className="">Manage Language</p>
                </div>
              </div>
              <div className="sidebar__content-language-country-content">
                {otherCounrys?.map((country) => (
                  <div
                    className="sidebar__content-language-country"
                    key={country._id}
                    onClick={() => setCurrentLanguage(country._id)}
                  >
                    <div className="country-name">
                      <p className="arText">{country?.title}</p>
                    </div>
                    <div className="country-flag">
                      <img src={country?.thumbnail} alt="error" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div
            className="sidebar__content-language-default"
            onClick={() => setLanguageOpen(!languageOpen)}
          >
            <div className="sidebar__content-language-icon">
              <img src={angleDown} alt="error" />
            </div>
            <div className="sidebar__content-language-country">
              <div className="country-name">
                <p className="arText">{currentLanguage?.title}</p>
              </div>
              <div className="country-flag">
                <img src={currentLanguage?.thumbnail} alt="error" />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default SideBar;
