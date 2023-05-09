import React, { useEffect } from "react";
import { useStyles } from "./Form.theme";

const Input = ({
  label,
  errorText,
  inputProps,
  value,
  styles,
  icon,
  placeholder,
  param,
}) => {
  const classes = useStyles;

  return (
    <div className={classes.formGroup}>

      {/* {label ? <label className={classes.formLabel}>{label}</label> : null} */}

      <input
        className="form-control form-control-md"
        style={styles}
        {...inputProps}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
      />
      {param === "ADDUSER" ? (
        <div style={{ top: "12px", position: "relative" }}> {icon} </div>
      ) : (
        icon
      )}

      {errorText && <span className={classes.formErrorStyle}>{errorText}</span>}

    </div>
  );
};

export default Input;
