import { useState } from "react";
import _ from "lodash";

function useForm({ onSubmit, validationSchema, initialValues }) {
  const [state, setState] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    var currentErrors = {};
    var currentTouched = {};

    Object.keys(validationSchema.fields).forEach((key) => {
      try {
        validationSchema.fields[key].validateSync(state[key]);
      } catch (err) {
        currentErrors[key] = err.message;
        currentTouched[key] = true;
      }
    });

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      setTouched(currentTouched);
    } else {
      onSubmit(state);
    }
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    validateField(name, value);
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function validateField(name, value) {
    try {
      const currentValidator = validationSchema.fields[name];
      currentValidator?.validateSync(value);
      const newErrors = _.omit(errors, name);
      setErrors(newErrors);
    } catch (err) {
      setErrors((errors) => ({
        ...errors,
        [name]: err.message,
      }));
    }
  }

  function handleBlur(e) {
    setTouched((state) => ({
      ...state,
      [e.target.name]: true,
    }));
  }

  return {
    values: state,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  };
}

export default useForm;
