import { useState } from "react";
import ModalForm from "../../components/modalForm/modalForm";

import Header from "./components/header/Header";
import SideBar from "./components/sideBar/SideBar";

const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="layout">
      <ModalForm />
      <SideBar setIsOpen={setIsOpen} isOpen={isOpen} />
      <div
        className="page-wrapper"
        style={
          !isOpen
            ? { maxWidth: "calc(100% - 229px)" }
            : { maxWidth: "calc(100% - 71px)" }
        }
      >
        <Header />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
