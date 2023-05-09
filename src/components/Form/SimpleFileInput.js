import React, { useEffect, useState } from "react";
// import { userAxios } from "../../utils/axios/user.axios";
import { useStyles } from "./Form.theme";

function SimpleFileInput({
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
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(() => {
    if (!value) {
      return multiple ? [] : "";
    }
    return value;
  });

  // useEffect(() => {
  //   if (multiple && !value) {
  //     onChange({
  //       target: {
  //         name,
  //         value: [],
  //       },
  //     });
  //   }
  //   if (!multiple && !value?.filename) {
  //     onChange({
  //       target: {
  //         name,
  //         value: {
  //           url: "",
  //         },
  //       },
  //     });
  //   }
  // }, []);

  async function handleChange(f) {
    const currentFile = f.target.files[0];

    onChange({
      target: {
        name,
        value: currentFile,
      },
    });
    setFileName(currentFile?.name);
  }

  return (
    <>
      <div style={{ marginTop: "10px", zIndex: "0" }}>
        <label className={classes.formLabel}>{label} </label>
        <div class="file-upload">
          <div class="file-select">
            <div class="file-select-button" id="fileName">
              Choose File
            </div>
            <div>
              <div>
                <input
                  type="file"
                  name="chooseFile"
                  className={classes.formControl}
                  onChange={handleChange}
                  onBlur={onBlur}
                  accept={accept}

                  // autoComplete="off"
                />

                <span
                  style={{
                    position: "absolute",
                    top: "0px",
                    fontSize: "1rem",
                    left: "105px",
                  }}
                >
                  {" "}
                  {fileName}
                </span>
              </div>
            </div>
          </div>
        </div>
        {errorText && (
          <span
            className={classes.formErrorStyle}
            style={{ marginTop: "6px", fontSize: ".875em" }}
          >
            {errorText}
          </span>
        )}
      </div>
    </>
  );
}

export default SimpleFileInput;
