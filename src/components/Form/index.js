import React, { useMemo } from "react";
import { Formik } from "formik";
import PropTypes from "prop-types";
import Element from "./Element";

/* 

let initialData = [
    { 
        key: 'key',
        initialValue: '', 
        eletype: 'input'   // select, autocomplete, fileinput, input
        inputProps: {
            type: 'text',
            placeholder: 'Enter Name',
            name: 'name'
            styles: ''
        }
    },
    { 
        key: 'key',
        initialValue: '', 
        eletype: 'select'   // select, autocomplete, fileinput,
        inputProps: {
            type: 'text',
            placeholder: 'Select Name',
            name: 'name'
            styles: ''
        },
        options: [{ 
            label: 'Label 1',
            value: 'value 1'
        }]
    }
];

*/

function Form({
  initialData,
  validationSchema = {},
  handleSubmit = null,
  formStyles = "",
  header = null,
  bodyStyles = "",
  editInitialData = {},
  columnWidthArray = [],
}) {
  const initialValues = useMemo(() => {
    return initialData.reduce((acc, val) => {
      let name = val.inputProps.name;
      if (name?.split(".").length === 1) {
        return {
          ...acc,
          [val.inputProps.name]: editInitialData[val.inputProps.name]
            ? editInitialData[val.inputProps.name]
            : val.initialValue,
        };
      }

      var [main, subMain] = name.split(".");
      return {
        ...acc,
        [main]: {
          ...acc[main],
          [subMain]: editInitialData[main][subMain]
            ? editInitialData[main][subMain]
            : val.initialValue,
        },
      };
    }, {});
  }, []);

  function getValueFromName(values, name) {
    if (name?.split(".").length === 1) return values[name];
    var [main, subMain] = name.split(".");
    return values[main] ? values[main][subMain] : "";
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <form onSubmit={handleSubmit} className={formStyles}>
            {header}
            <div className={bodyStyles}>
              {initialData.map(({ key, ...rest }, idx) => {
                return (
                  <Element
                    key={key}
                    columWidth={
                      columnWidthArray.length > 0
                        ? columnWidthArray[idx].width
                        : ""
                    }
                    {...rest}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={getValueFromName(values, rest.inputProps.name)}
                    errorText={
                      getValueFromName(touched, rest.inputProps.name) &&
                      getValueFromName(errors, rest.inputProps.name)
                    }
                    errorStyle=""
                  />
                );
              })}
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

Form.propTypes = {
  initialData: PropTypes.array,
  validationSchema: PropTypes.object,
  handleSubmit: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  handleCancel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  submitButton: PropTypes.object,
  cancelButton: PropTypes.object,
  formStyles: PropTypes.string,
  header: PropTypes.element,
  bodyStyles: PropTypes.string,
  actionStyles: PropTypes.string,
  editInitialData: PropTypes.object,
  columnWidthArray: PropTypes.array,
};

export default Form;
