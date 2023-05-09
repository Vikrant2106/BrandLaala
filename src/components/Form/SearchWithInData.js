import Input from "./Input";
import { useStyles } from "./Form.theme";
import { useEffect, useMemo, useRef, useState } from "react";
import { getVirtualElement } from "../../utils/global/global";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SearchWithInData = ({
  label,
  options = [],
  errorText,
  param,
  fncUserSearchedValue,
  value,
}) => {
  const classes = useStyles();
  const [showMenuItem, setShowMenuItem] = useState(false);
  const [filterdOptions, setFilterdOptions] = useState(options);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    if (value) {
      var data = options.find((d, i) => d.value == value);
      if (data) {
        setSearchVal(data.label);
      } else {
        setSearchVal("");
      }
    } else {
      setSearchVal("");
    }
  }, [options, value]);

  function handleItemClick(value) {
    setSearchVal(value.label);
    setShowMenuItem(false);
    fncUserSearchedValue(value);
  }

  var dropdownRef = useRef();

  function renderMenu() {
    return (
      <div className={classes.menuWrapper} ref={dropdownRef}>
        <ul
          className={classes.dropDown}
          style={{
            width: param == "PROJECTMENU" ? "160px" : "",
            marginTop:
              param == "OVERVIEW" || param == "PROJECTMENU" ? "-44px" : "",
          }}
        >
          {filterdOptions.map((option) => {
            return (
              <li
                className={classes.dropdownItem}
                onClick={() => handleItemClick(option)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  useOnClickOutside(dropdownRef, () => setShowMenuItem(false));

  function fncSearch(e) {
    setShowMenuItem(true);
    var val = e.target.value;
    setSearchVal(val);
    var data = options.filter((data) => {
      if (data.label.toUpperCase().includes(val.toUpperCase())) return data;
    });
    setFilterdOptions(data);
    if (val == "" || val == " ") {
      fncUserSearchedValue({
        label: "",
        value: "",
      });
    }
  }

  function fncOnClickSearch() {
    setShowMenuItem(true);
    setFilterdOptions(options);
  }
  return (
    <div className={classes.dropdownWrapper}>
      <input
        label={label}
        style={{
          position: "relative",
          fontSize: "1rem",
          color: "#333",
          borderRadius: "8px",
          maxWidth: "160px",
          cursor: "pointer",
          border: "1px solid #dce0e4",
          padding: "10px",
        }}
        onClick={fncOnClickSearch}
        onChange={fncSearch}
        errorText={errorText}
        value={searchVal}
        placeholder="Search User"
      />
      {showMenuItem && renderMenu()}
    </div>
  );
};

export default SearchWithInData;
