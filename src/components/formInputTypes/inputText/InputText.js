import React from "react";
import { ErrorMessage, useField } from "formik";

function InputText({
  label,
  placeholder,
  value: defValue,
  reaquired,
  ...props
}) {
  const [field, meta] = useField(props);
  const value = defValue ? { value: defValue } : {};
  return (
    <div className="textInpulItem customInput">
      <label className="label">
        {label}
        {reaquired && <span>*</span>}
      </label>
      <input
        placeholder={placeholder}
        autoComplete="off"
        {...props}
        {...field}
        {...value}
        className={meta.touched && meta.error ? "is-invalid" : ""}
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
}

export default InputText;
