import Input from "./Input";
import { useStyles } from "./Form.theme";
import { useEffect, useMemo, useRef, useState } from "react";
import { getVirtualElement } from "../utils/global/global";
import useOnClickOutside from "../../hooks/useOnClickOutside";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Dropdown = ({
  label,
  options = [],
  inputProps,
  value,
  errorText,
  styles,
  icons,
  placeholder,
  param,
  inputLabel = "",
  isHide,
}) => {
  const classes = useStyles();
  const [showMenuItem, setShowMenuItem] = useState(false);
  const [ddlValue, setDdlValue] = useState(false);

  const refElement = useMemo(() => {
    return getVirtualElement({ ...inputProps, type: "input" });
  }, []);

  function handleItemClick(value) {
    refElement.setValue(value);
    setShowMenuItem(false);
  }

  var dropdownRef = useRef();

  useEffect(() => {
    for (var i = 0; i < options.length; i++) {
      if (options[i].value == value) {
        setDdlValue(options[i].label);
      }
    }
  }, [value, options]);

  function renderMenu() {
    return (
      <div  className={classes.menuWrapper} ref={dropdownRef}>
        <ul
          className={classes.dropDown}
          style={{
            width: param == "PROJECTMENU" ? "160px" : "",
            marginTop:
              param == "OVERVIEW"
                ? "-26px"
                : param == "PROJECTMENU"
                ? "-50px"
                : "",
          }}
        >
          {/* {options.map((option) => {
            return (
              <li
                className={classes.dropdownItem}
                onClick={() => handleItemClick(option.value)}
              >
                {option.label}
              </li>
            );
          })} */}

          {isHide == "OVERVIEW"
            ? options.map((option) => {
                if (option.value != value) {
                  return (
                    <li
                      className={classes.dropdownItem}
                      onClick={() => handleItemClick(option.value)}
                    >
                      {option.label}
                    </li>
                  );
                }
              })
            : options.map((option) => {
                return (
                  <li
                    className={classes.dropdownItem}
                    onClick={() => handleItemClick(option.value)}
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

  function getLabelFromValue() {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption?.label;
  }

  return (
    <div className={classes.dropdownWrapper}>
      <p className={classes.select_label}>{inputLabel}</p>
      <Input
        param={param}
        label={label}
        styles={styles}
        inputProps={{
          onClick: () => setShowMenuItem(true),
          readOnly: true,
        }}
        // value={getLabelFromValue()}
        value={isHide == "OVERVIEW" ? ddlValue : getLabelFromValue()}
        errorText={errorText}
        placeholder={placeholder}
        icon={
          icons ? (
            <>
            </>
            // <ArrowDropDownIcon
            //   sx={{
            //     position: "absolute",
            //     right: 20,
            //     bottom: 24,
            //     cursor: "pointer",
            //   }}
            //   onClick={() => setShowMenuItem(true)}
            // />
          ) : (
            ""
          )
        }
      />
      {showMenuItem && renderMenu()}
    </div>
  );
};

export default Dropdown;
