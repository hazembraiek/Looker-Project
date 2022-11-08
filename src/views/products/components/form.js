import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
// import Loading from "../../../../components/loadin/Loading";
import { useModalFormContext } from "../../../context/modalFormContext";
import InputText from "../../../components/formInputTypes/inputText/InputText";
import InputUpload from "../../../components/formInputTypes/inputUpload/inputUpload";
import { FormButton } from "../../../components/button/modalButton";
import InputSelect from "../../../components/formInputTypes/inputSelect/InputSelect";
import GeoMap from "../../../components/map/map";
import { updateOne } from "../../../services/protectApi";
import { createPlace, updatePlace } from "../../../store/slices/places";
import { convertObjectToFormData } from "../../../helpers/convertObj2FormData";
import { createProduct, updateProduct } from "../../../store/slices/products";

function ProductsForm() {
  const { hidePopup, item, type } = useModalFormContext();
  const validate = Yup.object().shape({
    name: Yup.string().required("Title is required"),
    img: Yup.string().required("icon is required"),
  });

  const [loading, setLoading] = useState("");

  const dispatch = useDispatch();

  const createProductHandler = (values) => {
    dispatch(
      item
        ? updateProduct({ id: item?._id, product: { ...values } })
        : createProduct(values)
    ).then((res) => {
      if (!res?.error) {
        hidePopup();
      }
    });
  };

  return (
    <div className="customForm">
      <Formik
        initialValues={{
          name: item?.name || "",
          icon: item?.img || "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log({ values });
          createProductHandler(values);
        }}
      >
        {(formik) => {
          return (
            <Form>
              <div className="inputContainer">
                <InputText
                  label="Product Title"
                  placeholder="Enter your title"
                  reaquired={true}
                  name="name"
                  type="text"
                />
                <InputUpload
                  label="Product Icon"
                  placeholder="Enter your icon"
                  reaquired={true}
                  name="img"
                  type="text"
                  deafultFile={item?.img}
                  formik={formik}
                />
              </div>
              <FormButton label={`${type} product`} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ProductsForm;
