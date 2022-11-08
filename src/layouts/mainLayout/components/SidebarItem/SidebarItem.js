import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import subLinkIcon from "../../../../assets/icons/subLink.svg";

const SideBarItem = ({ route, setIsOpen, isOpen }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (isOpen) setOpen(false);
  }, [isOpen]);
  return (
    <li>
      {route.routes ? (
        <>
          <div
            className={`link-container ${open ? "activeRoute" : ""}`}
            onClick={() => {
              setIsOpen(false);
              setOpen(!open);
            }}
          >
            <div className="link">
              <div className="icon-link">
                <img src={route.icon} alt="link icon error" />
              </div>
              <span>{route.label}</span>
            </div>
            <div className={`subLinks ${open ? "openLink" : ""}`}>
              <img src={subLinkIcon} alt="error" />
            </div>
          </div>
          {open ? (
            <div className="subLinks-conainer">
              {route.routes.map((subRoute, i) => (
                <NavLink
                  to={subRoute.link}
                  className={`subLinks-conainer_subLink ${({ isActive }) =>
                    isActive ? "activeSubLink " : ""}`}
                  key={i}
                >
                  <span>{subRoute.label}</span>
                </NavLink>
              ))}
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <NavLink
          to={route.link}
          className={({ isActive }) => (isActive ? "activeLink" : "")}
        >
          <div className="link-container">
            <div className="link">
              <div className="icon-link">
                <img src={route.icon} alt="link icon error" />
              </div>
              <span>{route.label}</span>
            </div>
          </div>
        </NavLink>
      )}
    </li>
  );
};

export default SideBarItem;

/*

<li>
      <SideBarLink route={route}>
        <div
          className={`link-container ${route.open ? "activeLink" : ""}`}
          onClick={() => openRoute(route.id)}
        >
          <div className="link">
            <div className="icon-link">
              <img src={route.icon} alt="link icon error" />
            </div>
            <span>{route.label}</span>
          </div>
          {route.routes && (
            <div className="subLinks">
              <img src={subLinkIcon} alt="error" />
            </div>
          )}
        </div>
      </SideBarLink>
      {route.routes && open ? (
        <div className="subLinks-conainer">
          {route.routes.map((subRoute) => (
            <span className="subLinks-conainer_subLink">{subRoute.label}</span>
          ))}
        </div>
      ) : (
        ""
      )}
    </li>

*/
