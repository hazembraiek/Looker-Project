import React from "react";
import { useModalFormContext } from "../../context/modalFormContext";
import CreatePlaceForm from "./../../views/places/components/form";

import closeIcon from "./../../assets/icons/CloseWhite.png";
import ProductsForm from "../../views/products/components/form";
import CategoriesForm from "../../views/categories/components/form";

const Forms = {
  createPlace: CreatePlaceForm,
  createProduct: ProductsForm,
  createCategory: CategoriesForm,
};

function ModalForm() {
  const { show, hidePopup, form, header } = useModalFormContext();
  const FormComponent = Forms[form] || React.Fragment;

  return (
    <>
      {show && <div className="backscreen" onClick={hidePopup}></div>}
      <div className={`modalForm ${show ? "show" : ""}`}>
        <div className="modalForm-content">
          <div className="modalForm__hedaer">
            <p>{header}</p>
            <img src={closeIcon} alt="error" onClick={hidePopup} />
          </div>
          <div className="modalForm__form">
            <FormComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalForm;
