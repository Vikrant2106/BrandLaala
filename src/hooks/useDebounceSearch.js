import _ from "lodash";
import { useState } from "react";

function useDebounceSearch({ data = [], debounceTime = 200, predicate }) {
  const [state, setState] = useState(data);
  const func = _.debounce(function (searchValue) {
    if (!searchValue) {
      setState(data);
      return;
    }
    const newData = data.filter((value) => predicate(value, searchValue));
    setState(newData);
  }, debounceTime);

  return {
    data: state,
    handler: func,
  };
}

export default useDebounceSearch;
