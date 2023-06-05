import React, { Fragment, useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardExpandToggler,
    CardHeader,
} from "../../components/card/card.jsx";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Element from "../../components/Form/Element";
import { inputType } from "../../components/utils/enum.js";
import { useFormik } from "formik";
import { imageUploadValidation } from "../../components/utils/validation.js";
import AddBuyerModal from "../../modal/AddBuyerModal.js";
import axios from "axios";
import { successToast } from "../../components/toast/toast.js";


function UploadBuyersImages({  buyerid, data, isNewDone ,fncApiCall,fncCloseModel}) {
    const INIT_STATE = {
        images: "",
    };



    const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
        useFormik({
            enableReinitialize: true,
            initialValues: isNewDone
                ? INIT_STATE: data?.data
                ,
            onSubmit: onSubmit,
            validationSchema: imageUploadValidation,
        });


    async function onSubmit(da) {
          

        var formdata = new FormData();
        for (var i = 0; i < da.images.length; i++) {
            formdata.append("files", da.images[i].data);
        }
        formdata.append("upload_type", "buyer_profile");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_API_URL}upload/profile_pic/${buyerid==undefined?data.id:buyerid}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                
                if(result?.status==1)
                {
                    successToast("Images added successfully");
                    fncApiCall();
                    fncCloseModel(true);
                }

            })
        .catch(error => console.log('error', error));
    }

    return (
        <Fragment>
            <Card className="mb-3">

                <CardHeader>
                    <div> Upload Buyers Images</div>
                </CardHeader>

                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12">
                                <Element
                                    buyerid={data?.id}
                                    eletype={inputType.file}
                                    label="Please upload buyers images"
                                    placeholder="Please upload buyers images"
                                    inputProps={{
                                        onChange: handleChange,
                                        onBlur: handleBlur,
                                        name: "images",
                                    }}
                                    errorText={touched.images && errors.images}
                                    value={values.images}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6"></div>
                            <div className="col-md-3"></div>
                            <div className="col-md-3">
                            <button type="button" style={{marginRight:"10px"}} onClick={fncCloseModel} className="btn btn-outline-theme btn-lg">Close</button>
                            
                                <button type="submit" className="btn btn-outline-theme btn-lg">Upload Images</button>
                                
                            </div>
                        </div>
                    </form>

                </CardBody>
            </Card>



        </Fragment>
    );
}
export default UploadBuyersImages;
