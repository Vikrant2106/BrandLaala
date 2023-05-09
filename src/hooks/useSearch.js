import _ from "lodash";

function useSearch(data, key) {
  const handleTextChange = (searchValue, otherData) => {
    if (otherData) {
      data = otherData;
    }
    if (!searchValue) return data;
    const comparedVal = searchValue.toLowerCase();
    return data.filter((ele) => ele[key]?.toLowerCase().includes(comparedVal));
  };

  return {
    handleTextChange,
  };
}

export default useSearch;
