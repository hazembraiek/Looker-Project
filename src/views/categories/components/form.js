import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useModalFormContext } from "../../../context/modalFormContext";
import InputText from "../../../components/formInputTypes/inputText/InputText";
import InputUpload from "../../../components/formInputTypes/inputUpload/inputUpload";
import { FormButton } from "../../../components/button/modalButton";
import {
  createCategory,
  updateCategory,
} from "../../../store/slices/categories";
import InputSelectMultiple from "../../../components/formInputTypes/inputSelectMultiple/InputSelectMultiple";
import { getProducts } from "../../../store/slices/products";
import { convertObjectToFormData } from "../../../helpers/convertObj2FormData";

function CategoriesForm() {
  const { hidePopup, item, type } = useModalFormContext();
  const validate = Yup.object().shape({
    name: Yup.string().required("Title is required"),
    img: Yup.string().required("icon is required"),
  });

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (products?.length == 0) dispatch(getProducts());
  }, [products]);

  const options = products?.map((product) => {
    return { label: product?.name, value: product?._id };
  });

  const defaultOptions = products
    .map((product) => {
      return item?.products.includes(product._id)
        ? { label: product.name, value: product._id }
        : null;
    })
    .filter((product) => !!product);

  const [loading, setLoading] = useState("");

  const dispatch = useDispatch();

  const createCategoryHandler = (values) => {
    console.log({ values });
    const products = values?.products?.map((keyword) => keyword.value);
    const category = { ...values, products };
    console.log({ category });
    dispatch(
      item
        ? updateCategory({
            id: item?._id,
            category: convertObjectToFormData(category),
          })
        : createCategory(convertObjectToFormData(category))
    ).then((res) => {
      console.log({ res });
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
          img: item?.img || "",
          products: item?.products || "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          createCategoryHandler(values);
        }}
      >
        {(formik) => {
          return (
            <Form>
              <div className="inputContainer">
                <InputText
                  label="Category Title"
                  placeholder="Enter your category"
                  reaquired={true}
                  name="name"
                  type="text"
                />
                <InputUpload
                  label="Category Icon"
                  placeholder="Enter your icon"
                  reaquired={true}
                  name="img"
                  type="text"
                  deafultFile={item?.img}
                  formik={formik}
                />
                <InputSelectMultiple
                  label="Products"
                  placeholder="Add your products"
                  name="products"
                  options={options}
                  defaultValue={defaultOptions}
                />
              </div>
              <FormButton label={`${type} Category`} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CategoriesForm;
