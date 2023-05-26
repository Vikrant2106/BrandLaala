import React, { useEffect, useState } from "react";
// import { userAxios } from "../../utils/axios/user.axios";
// import { useStyles } from "./Form.theme";
import axios from "axios";
import { successToast } from "../toast/toast";


var formControl = {
  display: "inline",
  height: "50px",
  width: "18%",
  padding: "12px",
  fontSize: "1rem",
  fontWeight: "400",
  color: "#212529",
  backgroundColor: "transparent",
  backgroundClip: "padding-box",
  border: "1px solid #ced4da",
  webkitAppearance: "none",
  mozAppearance: "none",
  appearance: "none",
  borderRadius: "0.25rem",
  outline: " none",
}

var filename = {
  marginTop: "5px",
  marginLeft: "5px",
  color: "white",
  fontSize: "14px",
  paddingLeft: "10px",
  backgroundColor: "rgba(var(--bs-body-color-rgb), 0.03)"
};

function FileInput({
  buyerid,
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
  // const classes = useStyles();
  const [file, setFile] = useState([]);


  useEffect(() => {
    if (value !== "") {
      var da = [];
      for (var i = 0; i < value.length; i++) {
        da.push({
          id: value[i]._id,
          data: {
            name: value[i].filename
          }
        })
      }
      setFile(da);
    }
  }, []);

  async function handleChange(e) {
    let currentFile = e.target.files;
    var da = []
    for (var i = 0; i < currentFile.length; i++) {
      da.push({
        id: i + 1,
        data: currentFile[i]
      })
    }
    onChange({
      target: {
        name,
        value: da,
      },
    });
    setFile(da);

  }





  async function fncOnCancelClick(id) {
    if (value === "") {
      var da = file;
      var data = da.filter((d) => d.id != id)
      onChange({
        target: {
          name,
          value: data,
        },
      });
      successToast("Image removed successfully");
      setFile(data)
    }
    else {
      let res = await axios.delete(
        `${process.env.REACT_APP_API_URL}upload/profile_pic/${buyerid}/${id}/`
      );
       
      if (res?.data?.status == 1) {
        successToast(res?.data?.message);
        var filesData = file;
        var da = filesData.filter((d)=> d.id!==id)
        setFile(da);
      }

    }

  }

  return (
    <>
      <div style={{ marginTop: "10px", zIndex: "0" }}>
        <div class="file-upload">
          <div class="file-select">

            <input
              type="file"
              name="chooseFile"
              multiple
              style={formControl}
              onChange={handleChange}
              onBlur={onBlur}
              accept={accept}
              autoComplete="off"
            />
            {
              file.length == 0 ? <span style={{ marginLeft: "10px" }}>Please select images </span> : <span style={{ marginLeft: "10px" }}>
                {file.length + " images selected"}
              </span>
            }
          </div>
        </div>
        <div className="row mt-2">
          {
            file?.map((val) => {
              return <div className="col-md-4" >
                <p style={filename}>{val.data.name}
                  <span
                    style={{ padding: "10px", fontSize: "17px", margin: "2px 5px 2px 5px" }}
                    className="fas fa-times"
                    onClick={() => {
                      fncOnCancelClick(val.id)
                    }}
                  />
                </p>
              </div>;

            })}
        </div>
        {errorText && (
          // <span className={classes.formErrorStyle}>{errorText}</span>
          <span>{errorText}</span>
        )}
      </div>
    </>
  );
}

export default FileInput;
