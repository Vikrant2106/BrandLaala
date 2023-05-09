import React from "react";
import { inputType } from "../utils/enum";
import DatePicker from "react-datepicker";
import  {useStyles}  from "./Form.theme";
import Input from "./Input";
import Dropdown from "./Dropdown";
import Switch from "./Switch";
import FileInput from "./FileInput";
import NumberInput from "./Number";
import CheckboxList from "./CheckBoxGroup";
import SimpleFileInput from "./SimpleFileInput";
import OverviewFileInput from "./OverviewFileInput";

function Element({
  eletype,
  label,
  errorText,
  inputProps,
  options,
  value,
  placeholder,
  onChange,
  name,
  ...rest
}) {
  const classes = useStyles;
  function renderInput() {
    return (
      <Input
        label={label}
        errorText={errorText}
        inputProps={inputProps}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
    );
  }

  function renderNumberInput() {
    return (
      <NumberInput
        label={label}
        placeholder={placeholder}
        errorText={errorText}
        inputProps={inputProps}
        value={value}
        {...rest}
      />
    );
  }

  function renderTextarea() {
    return (
      <div className={classes.formGroup}>
        {/* <label className={classes.formLabel}>{label}</label> */}
        <textarea
        style={{width:"100%",background:"none"}}
          // className={classes.textareaFormControl}
          type="text"
          cols="4"
          rows="6"
          {...inputProps}
          value={!value ? "" : value}
          autoComplete="off"
          {...rest}
          placeholder={placeholder}
        />
        {errorText && (
          <span className={classes.formErrorStyle}>{errorText}</span>
        )}
      </div>
    );
  }

  function renderSelect() {
    return (
      <Dropdown
        label={label}
        errorText={errorText}
        options={options}
        inputProps={inputProps}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
    );
  }

  function renderAutoComplete() {
    return (
      <div className={classes.formGroup}>
        <label className={classes.formLabel}>Give your project name here</label>
        <input className={classes.formControl} type="text" autoComplete="off" />
      </div>
    );
  }
  function renderDatePicker() {
    return (
      <>
        <div className={classes.formGroup}>
          {/* <label className={classes.formLabel}>{label}</label> */}
          <DatePicker
            className={
              inputProps.disabled
                ? classes.formControlDisabled
                : classes.formControl
            }
            style={{ zIndex: "1000" }}
            selected={!value ? "" : value}
            dateFormat="dd/MM/yyyy"
            {...inputProps}
            {...rest}
            onChange={(date) => {
              inputProps.onChange({
                target: {
                  name: inputProps.name,
                  value: date,
                },
              });
            }}
            autoComplete="off"
            placeholderText={placeholder}
          />
          {errorText && (
            <span className={classes.formErrorStyle}>{errorText}</span>
          )}
        </div>
      </>
    );
  }

  function renderCheckBoxGroup() {
    return (
      <CheckboxList
        label={label}
        errorText={errorText}
        value={value}
        options={options}
        onChange={onChange}
        name={name}
      />
    );
  }
  return (
    <>
      {eletype === inputType.input && renderInput()}
      {eletype === inputType.number && renderNumberInput()}
      {eletype === inputType.select && renderSelect()}
      {eletype === inputType.textarea && renderTextarea()}
      {eletype === inputType.autocomplete && renderAutoComplete()}
      {eletype === inputType.date && renderDatePicker()}
      {eletype === inputType.checkboxgroup && renderCheckBoxGroup()}
      {eletype === inputType.switch && (
        <Switch label={label} {...inputProps} {...rest} value={value} />
      )}
      {eletype === inputType.file && (
        <FileInput
          label={label}
          {...inputProps}
          {...rest}
          errorText={errorText}
          value={value}
        />
      )}
      {eletype === inputType.overviewfileinput && (
        <OverviewFileInput
          label={label}
          {...inputProps}
          {...rest}
          errorText={errorText}
          value={value}
        />
      )}
      {eletype === inputType.simplefile && (
        <SimpleFileInput
          label={label}
          {...inputProps}
          {...rest}
          errorText={errorText}
          value={value}
        />
      )}
    </>
  );
}

export default Element;
