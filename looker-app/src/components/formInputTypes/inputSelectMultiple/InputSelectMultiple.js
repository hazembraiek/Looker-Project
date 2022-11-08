import React from "react";
import { ErrorMessage, Field, useField } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import { fieldToTextField } from "formik-material-ui";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FormikAutocomplete = ({
  placeholder,
  textFieldProps,
  defaultValue = [],
  ...props
}) => {
  const {
    form: { setTouched, setFieldValue },
  } = props;
  const { error, helperText, ...field } = fieldToTextField(props);
  const { name } = field;
  return (
    <Autocomplete
      {...props}
      defaultValue={defaultValue}
      onChange={(_, value) => setFieldValue(name, value)}
      onBlur={() => setTouched({ [name]: true })}
      getOptionLabel={(option, current) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      style={{ width: "100%", height: "60px", margin: 0 }}
      renderInput={(props) => (
        <TextField
          {...props}
          {...textFieldProps}
          helperText={helperText}
          error={error}
          placeholder={placeholder}
          className="resize"
        />
      )}
    />
  );
};

function InputSelectMultiple({
  label,
  options = [],
  placeholder,
  reaquired,
  name,
  defaultValue,
  mutiple = true,
}) {
  console.log({ options });
  return (
    <div className="selectInpulItem customInput">
      <label className="label">
        {label}
        {reaquired && <span>*</span>}
      </label>

      <Field
        name={name}
        component={FormikAutocomplete}
        label="Skills"
        options={options}
        textFieldProps={{
          fullWidth: true,
          margin: "normal",
          variant: "outlined",
        }}
        multiple={mutiple}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default InputSelectMultiple;
