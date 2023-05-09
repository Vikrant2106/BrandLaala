import React, { useEffect, useState } from "react";
// import { userAxios } from "../../utils/axios/user.axios";
import { useStyles } from "./Form.theme";

function OverviewFileInput({
  label,
  onChange,
  onBlur,
  name,
  value = "",
  errorText,
  url,
  extraArguments = {},
  multiple = false,
  accept,
}) {
  const classes = useStyles();
  const [file, setFile] = useState();
 

  useEffect(() => {
    setFile(value);
    if (multiple && !value) {
      onChange({
        target: {
          name,
          value: [],
        },
      });
    }
    if (!multiple && !value?.filename) {
      onChange({
        target: {
          name,
          value: {
            url: "",
          },
        },
      });
    }
  }, [value]);

  async function handleChange(e) {
    const currentFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", currentFile);
    Object.keys(extraArguments).forEach((key) => {
      formData.append(key, extraArguments[key]);
    });
    // const response = await userAxios.post(url, formData);

    // if (multiple) {
    //   setFile((data) => [...data, response.data]);
    //   onChange({
    //     target: {
    //       name,
    //       value: [...file, response.data],
    //     },
    //   });
    // } else {
    //   setFile(response.data);
    //   onChange({
    //     target: {
    //       name,
    //       value: response.data,
    //     },
    //   });
    // }
  }

  return (
    <>
      <div style={{ marginTop: "10px", zIndex: "0" }}>
        <label className={classes.formLabel}>{label}</label>

        <div class="file-upload">
          <div class="file-select">
            <div class="file-select-button" id="fileName">
              Choose File
            </div>
            {!multiple ? (
              <div class="file-select-name" id="noFile">
                
                {file?.filename
                  ? file?.filename?.substring(0, 10) + "..."
                  : "No file chosen..."}
              </div>
            ) : (
              <div class="file-select-name" id="noFile">
                Upload File...
              </div>
            )}
            <input
              type="file"
              name="chooseFile"
              className={classes.formControl}
              onChange={handleChange}
              onBlur={onBlur}
              accept={accept}
              autoComplete="off"
            />
          </div>
        </div>
        {multiple &&
          file?.map((val) => {
            return <p className={classes.filename}>{val.filename}</p>;
          })}
        {errorText && (
          <span className={classes.formErrorStyle}>{errorText}</span>
        )}
      </div>
    </>
  );
}

export default OverviewFileInput;
