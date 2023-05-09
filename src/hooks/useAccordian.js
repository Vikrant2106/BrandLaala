import { useState } from "react";

const useAccordion = (length, showValue) => {
  var [state, setState] = useState(() => {
    if (length <= showValue) {
      return Array(length).fill(true);
    }

    return Array(showValue)
      .fill(true)
      .concat(Array(length - showValue).fill(false));
  });

  function handleChange(id) {
    var newState = Array(length).fill(false);
    newState[id] = !state[id];
    setState(newState);
  }
  return {
    accordianState: state,
    handleChange,
  };
};

export default useAccordion;
