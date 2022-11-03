import { ErrorMessage, useField } from "formik";

function Input({ label, placeholder, className, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="inputContainer">
      <label htmlFor={field.name} className="label">
        {label}
      </label>
      <input
        placeholder={placeholder}
        autoComplete="off"
        {...props}
        {...field}
        className={`${className} ${meta.touched && meta.error && "is-invalid"}`}
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
}

export default Input;
