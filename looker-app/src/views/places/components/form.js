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

function CeatePlaceForm() {
  const [positionPlace, setPosition] = useState("");
  const { hidePopup, id, item, type } = useModalFormContext();
  const validate = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    // category: Yup.string().required("category is required"),
    latitude: Yup.string().required("latitude is required"),
    longitude: Yup.number().required("longitude is required"),
  });
  const [loading, setLoading] = useState("");

  const dispatch = useDispatch();
  const { lat, lng } = positionPlace || {};
  console.log({ lat, lng });

  const createPlace = (values) => {
    console.log(values);
  };

  return (
    <div className="customForm">
      <Formik
        initialValues={{
          title: item?.title || "",
          category: item?.title || "qs",
          longitude: item?.longitude || lng || "",
          latitude: item?.latitude || lat || "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          createPlace(values);
        }}
      >
        {(formik) => {
          return (
            <Form>
              <div className="inputContainer">
                <InputText
                  label="Place Title"
                  placeholder="Enter your title"
                  reaquired={true}
                  name="title"
                  type="text"
                />

                <InputSelect
                  label="Place Category"
                  placeholder="Enter your Category"
                  reaquired={true}
                  name="category"
                  type="text"
                />

                <div className="form-row">
                  <InputText
                    label="longitude"
                    placeholder="Enter your longitude"
                    reaquired={true}
                    name="longitude"
                    type="text"
                    value={lng}
                  />
                  <InputText
                    label="latitude"
                    placeholder="Enter your latitude"
                    reaquired={true}
                    name="latitude"
                    type="text"
                    value={lat}
                  />
                </div>

                <div className="mapContainer">
                  <GeoMap setPosition={setPosition} />
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

export default CeatePlaceForm;
