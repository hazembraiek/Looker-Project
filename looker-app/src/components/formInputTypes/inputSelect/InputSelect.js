import React from "react";
import { ErrorMessage, useField } from "formik";

function InputSelect({
  label,
  placeholder,
  reaquired,
  options,
  defaultValues,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <div className="selectInpulItem customInput">
      <label className="label">
        {label}
        {reaquired && <span>*</span>}
      </label>
      <select
        placeholder={placeholder}
        {...props}
        {...field}
        className={meta.touched && meta.error ? "is-invalid" : ""}
      >
        <option value={null}>select</option>
        {options?.map((opt, i) => {
          return (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
}

export default InputSelect;
