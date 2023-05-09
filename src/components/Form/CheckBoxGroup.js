import * as React from "react";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Checkbox from "@mui/material/Checkbox";
import { useStyles } from "./Form.theme";

export default function CheckboxList({
  options,
  label,
  errorText,
  inputProps,
  value,
  onChange,
  name,
}) {
  const [checked, setChecked] = React.useState(value);
  const classes = useStyles();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onChange({
      target: {
        name: name,
        value: newChecked,
      },
    });
    setChecked(newChecked);
  };

  return (
    <>
      {label ? (
        <label className={classes.formLabelCheckbox}>{label}</label>
      ) : null}
      {/* <List
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
      >
        {options.map((value) => {
          const labelId = `checkbox-list-label-${value.name}`;

          return (
            <ListItem key={value.name} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value.name)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    {...inputProps}
                    checked={checked.indexOf(value.name) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List> */}
      {errorText && <span className={classes.formErrorStyle}>{errorText}</span>}
    </>
  );
}
