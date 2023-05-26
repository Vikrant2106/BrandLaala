import React, { useEffect, useRef } from "react";
import { useStyles } from "./Form.theme";

const NumberInput = ({
  label,
  errorText,
  inputProps,
  value,
  styles,
  icon,
  placeholder,
}) => {
  const classes = useStyles;
  const inputRef = useRef();

  function scrollHandler(e) {
    e.preventDefault();
  }

  useEffect(() => {
    const element = inputRef.current;

    element.addEventListener("mousewheel", scrollHandler);

    return () => {
      element.removeEventListener("mousewheel", scrollHandler);
    };
  }, []);

  function handleInputChange(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    inputProps.onChange({
      target: {
        name: inputProps.name,
        value: evt.target.value,
      },
    });
  }

  return (
    <div className={classes.formGroup}>
      {/* {label ? <label className={classes.formLabel}>{label}</label> : null} */}
      <input
        className="form-control form-control-lg bg-white bg-opacity-5"
        style={styles}
        {...inputProps}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleInputChange}
        type="number"
        ref={inputRef}
      />
      {icon}
      {errorText && <span className={classes.formErrorStyle}>{errorText}</span>}
    </div>
  );
};

export default NumberInput;
