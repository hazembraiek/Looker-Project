import { ErrorMessage, useField } from "formik";
import { useState } from "react";

const getImageUrl = (file) => {
  if (file) {
    return URL.createObjectURL(file);
  } else return null;
};
function InputUpload({
  label,
  reaquired,
  deafultFile = null,
  formik,
  ...props
}) {
  const [field, meta] = useField(props);
  const [file, setFile] = useState(null);
  const RandomNumber = Math.floor(Math.random() * 9999);
  return (
    <div className="inputUpload customInput">
      <label className="label">
        {label}
        {reaquired && <span>*</span>}
      </label>
      <div
        className={`inputUpload-content customcontainer ${
          meta.touched && meta.error ? "is-invalid" : ""
        }`}
      >
        <p className="imageName">
          {!file && !deafultFile ? (
            "Select your Image"
          ) : deafultFile && !file ? (
            <img src={deafultFile} className="image" />
          ) : (
            <img src={URL.createObjectURL(file)} className="image" />
          )}
        </p>
        <label htmlFor={"upload" + RandomNumber} className="buttonUpload">
          Browser
        </label>
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
            formik.setFieldValue(field.name, e.target.files[0]);
          }}
          id={"upload" + RandomNumber}
          {...props}
          name={field.name}
          type="file"
        />
      </div>
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
}

export default InputUpload;
