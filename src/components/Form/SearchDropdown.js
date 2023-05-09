import { useStyles } from "./Form.theme";
import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { getVirtualElement, getAllProjects } from "../../utils/global/global";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { fetchAllProjectsThunk } from "../../store/slices/project/project.slice";
import _ from "lodash";

const SearchDropdown = ({ handleItemClick }) => {
  const classes = useStyles();
  const [ddValue, setDdValue] = useState("");
  const [dropdownOption, setDropdownOptions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dispatch = useDispatch();

  var dropdownRef = useRef();
  useOnClickOutside(dropdownRef, () => setIsDropdownVisible(false));

  function selectedOption(id) {
    setDdValue("");
    setIsDropdownVisible(false);
    handleItemClick(id);
  }

  function renderMenu() {
    return (
      <div className={classes.menuWrapper} ref={dropdownRef}>
        <ul
          className={classes.dropDown}
          style={{ marginTop: "-62px", marginLeft: "80px" }}
        >
          {dropdownOption?.length == 0 ? (
            <div style={{ padding: "10px", textAlign: "center" }}>
              No data found
            </div>
          ) : (
            dropdownOption?.map((option) => {
              return (
                <li
                  className={classes.dropdownItem}
                  onClick={() => selectedOption(option.id)}
                >
                  {option.project_name}
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }

  const debounce = (func) => {
    let timer;
    return function (...args) {
      
      setDdValue(args[0].target.value);
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  async function handleInputChange(e) {
    let val = e.target.value;

    if (val == "" || val == " ") return;
    const data = await getAllProjects({
      term: val,
      type: "all",
      spoc: -1,
      page: -1,
    });
    setDropdownOptions(data.data);
    setIsDropdownVisible(true);
  }

  const optimizedDDOption = useCallback(debounce(handleInputChange), []);

  return (
    <div className={classes.dropdownWrapper}>
      <input
        type="text"
        placeholder="Search Project"
        className={classes.searchddInput}
        onChange={optimizedDDOption}
        value={ddValue}
      />
      {isDropdownVisible && renderMenu()}
    </div>
  );
};

export default SearchDropdown;
