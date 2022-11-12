import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { getCategories } from "../../../store/slices/categories";

function CreatePlaceForm() {
  const [positionPlace, setPosition] = useState("");
  const { hidePopup, item, type } = useModalFormContext();
  const validate = Yup.object().shape({
    name: Yup.string().required("Title is required"),
    description: Yup.string().required("description is required"),
    lat: Yup.string().required("latitude is required"),
    lan: Yup.number().required("longitude is required"),
  });

  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    if (categories?.length == 0) dispatch(getCategories());
  }, []);
  const [loading, setLoading] = useState("");

  const options = categories?.map((category) => {
    return { label: category?.name, value: category?._id };
  });
  console.log({ item });

  const { lat, lng } = positionPlace || {};

  // lan: 10.5965369;
  // lat;

  const createPlaceHandler = (values) => {
    console.log({ values });
    dispatch(
      item
        ? updatePlace({ id: item?._id, place: { ...values } })
        : createPlace(values)
    ).then((res) => {
      if (!res?.error) {
        hidePopup();
      }
    });
  };

  console.log({ lan: item?.lan, lat: item?.lat });

  return (
    <div className="customForm">
      <Formik
        initialValues={{
          name: item?.name || "",
          category: item?.category?._id || "",
          description: item?.description || "",
          lan: item?.lan || lng || "",
          lat: item?.lat || lat || "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log({ values });
          createPlaceHandler(values);
        }}
      >
        {(formik) => {
          return (
            <Form>
              <div className="inputContainer">
                <div className="form-row">
                  <InputText
                    label="Place Title"
                    placeholder="Enter your title"
                    reaquired={true}
                    name="name"
                    type="text"
                  />
                  <InputText
                    label="Place Description"
                    placeholder="Enter your description"
                    reaquired={true}
                    name="description"
                    type="text"
                  />
                </div>

                <InputSelect
                  label="Place Category"
                  placeholder="Enter your Category"
                  reaquired={true}
                  name="category"
                  type="text"
                  options={options}
                />

                <div className="form-row">
                  <InputText
                    label="longitude"
                    placeholder="Enter your longitude"
                    reaquired={true}
                    name="lan"
                    type="text"
                    value={lng}
                  />
                  <InputText
                    label="latitude"
                    placeholder="Enter your latitude"
                    reaquired={true}
                    name="lat"
                    type="text"
                    value={lat}
                  />
                </div>

                <div className="mapContainer">
                  <GeoMap
                    setPosition={setPosition}
                    positions={[{ lan: item?.lan, lat: item?.lat }]}
                  />
                </div>
              </div>
              <FormButton label={`${type} place`} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CreatePlaceForm;
