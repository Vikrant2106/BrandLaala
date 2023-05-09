import React, { useMemo, useState, useRef, useEffect } from "react";

import { useStyles } from "./Form.theme";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Input from "./Input";
import { Chip, ListItem, Paper } from "@mui/material";
import _ from "lodash";

function AutocompleteChip({
  value,
  label,
  errorText,
  chipsData,
  getOptions,
  name,
  onChange,
  isChipsVisible,
  deleteChip,
  readOnly,
  placeholder,
  extra = {},
}) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(value);
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOpen(false);
  }, []);

  const debounceFunction = useMemo(() => {
    return _.debounce(async (search) => {
      const response = await getOptions(search, extra);
      setLoading(false);
      setOptions(response);
    }, 500);
  }, [extra]);

  function handleItemClick(option) {
    onChange(option);
    setOpen(false);
    setSearchValue("");
  }

  var dropdownRef = useRef();

  const handleDelete = (chipToDelete) => {
    deleteChip(chipToDelete);
  };

  function renderMenu() {
    return (
      <div className={classes.menuWrapper} ref={dropdownRef}>
        <ul className={classes.dropDown}>
          {searchValue && options.length === 0 && !isLoading && (
            <li
              className={classes.dropdownItem}
              style={{
                fontSize: "14px",
                color: "#aaa",
                marginBottom: "5px",
              }}
            >
              No Results Found
            </li>
          )}

          {searchValue && isLoading && (
            <li
              className={classes.dropdownItem}
              style={{ fontSize: "14px", color: "#aaa", marginBottom: "5px" }}
            >
              Fetching Results
            </li>
          )}

          {searchValue &&
            options.map((option) => {
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

  useOnClickOutside(dropdownRef, () => setOpen(false));

  function getLabelFromValue(value) {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption?.label;
  }

  async function handleInputChange(e) {
    onChange("");
    setLoading(true);
    setSearchValue(e.target.value);
    debounceFunction(e.target.value);
  }

  return (
    <div className={classes.dropdownWrapper} onClick={() => setOpen(true)}>
      <Input
        label={label}
        inputProps={{
          onChange: handleInputChange,
          placeholder: placeholder,
        }}
        value={searchValue}
        errorText={errorText}
        name={name}
        readOnly={readOnly}
        style={{ width: "400px" }}
      />
      {isOpen && searchValue && renderMenu()}
      <Paper
        sx={{
          display: "flex",
          justifyContent: "start",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        {isChipsVisible &&
          chipsData?.map((data) => {
            return (
              <ListItem key={data.key} sx={{ display: "contents" }}>
                <Chip
                  label={data.label}
                  onDelete={() => handleDelete(data)}
                  sx={{ marginRight: "1rem" }}
                />
              </ListItem>
            );
          })}
      </Paper>
    </div>
  );
}

export default AutocompleteChip;
