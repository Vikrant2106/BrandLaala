import React, { useEffect, useState } from 'react';
import {
    Card,
    CardBody,
    CardExpandToggler,
    CardHeader,
} from "../components/card/card.jsx";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Element from "../components/Form/Element";
import { inputType } from "../components/utils/enum.js";
import { useFormik } from "formik";
import { buyersValidationSchema } from "../components/utils/validation.js";
import axios from 'axios';
import {
    successToast, failureToast
} from '../components/toast/toast.js';
import BuyersOrder from '../pages/buyers/buyersOrder.js';
import UploadBuyersImages from '../pages/buyers/uploadBuyersImages.js';


function AddBuyerModal({ modalEditData, isShow, fncResetModalState, fncApiCall, isNew }) {

    const [lgShow, setLgShow] = useState(false);
    const [isBuyerAdded, setIsBuyerAdded] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [buyerid, setBuyerID] = useState("");
    const [orderID, setOrderID] = useState("");
    const [isNewDone, setIsNewDone] = useState(true);
    const [createdBuyersID, setCreatedBuyersID] = useState("");

    

    useEffect(() => {
        setLgShow(isShow)
        setIsNewDone(isNew)
    }, [isShow, buyerid])


    useEffect(() => {

        setLgShow(isShow)
        setIsNewDone(isNew)
        if (!isNew) {
            setBuyerID(modalEditData._id);
            setIsBuyerAdded(true);
            setIsOrderPlaced(true);
        }
        else {
            setIsBuyerAdded(false);
            setIsOrderPlaced(false);
        }

    }, [isNew])

    const INIT_STATE = {
        first_name: "",
        last_name: "",
        email: "",
        contact_number: "",
        dob: "",
        facebook_account: "",
        instagram_account: "",
        date_of_delivery: "",
        enquiry: "",
    };


    const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
        useFormik({
            enableReinitialize: true,
            initialValues: modalEditData.id !== undefined
                ? {
                    ...modalEditData.data
                }
                : INIT_STATE,
            onSubmit: onSubmit,
            validationSchema: buyersValidationSchema,
        });

    async function onSubmit(data) {
        if (modalEditData?.id !== undefined || createdBuyersID !== ""){
            let res = await axios.put(
                `${process.env.REACT_APP_API_URL}buyer/${modalEditData?.id === undefined ?createdBuyersID :modalEditData?.id}`, { data: { ...data } }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
            successToast(res?.data?.message);
       
        }
        else {
            let res = await axios.post(
                `${process.env.REACT_APP_API_URL}buyer/`, { data: { ...data } }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
            successToast(res?.data?.message);
            setBuyerID(res?.data?.data?._id);
            setIsBuyerAdded(true);
            setCreatedBuyersID(res?.data?.data?._id)
            addBuyerOrders(res?.data?.data?._id)
            fncApiCall();
        }
    }
    function fncCloseModel()
    {
        setLgShow(false);
        fncResetModalState(false);
    }

  async  function addBuyerOrders(buyer_id)
    {
        let res = await axios.post(
            `${process.env.REACT_APP_API_URL}buyer_order/${buyer_id}/`, { data: { items: [] } }
        );
        debugger;
        setOrderID(res?.data?.data?._id);
        
    }

    function fncGetOrderId(orderID) {
        // setOrderID(orderID);
        setIsOrderPlaced(true);
    }

    return (
        <>
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => { setLgShow(false); fncResetModalState(false) }}
                aria-labelledby="example-modal-sizes-title-lg"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Add Buyer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <div style={{ width: "100%" }} className="mb-3">
                                <Element
                                    eletype={inputType.input}
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    inputProps={{
                                        onChange: handleChange,
                                        onBlur: handleBlur,
                                        name: "first_name",
                                    }}
                                    errorText={touched.first_name && errors.first_name}
                                    value={values.first_name}
                                />
                            </div>
                            <div style={{ width: "100%" }} className="mb-3">
                                <Element
                                    eletype={inputType.input}
                                    label="last name"
                                    placeholder="Enter your last name"
                                    inputProps={{
                                        onChange: handleChange,
                                        onBlur: handleBlur,
                                        name: "last_name",
                                    }}
                                    errorText={touched.last_name && errors.last_name}
                                    value={values.last_name}
                                />
                            </div>
                            <div style={{ width: "100%" }} className="mb-3">
                                <Element
                                    eletype={inputType.number}
                                    label="mobile"
                                    placeholder="Enter your mobile number"
                                    inputProps={{
                                        onChange: handleChange,
                                        onBlur: handleBlur,
                                        name: "contact_number",
                                    }}
                                    errorText={touched.contact_number && errors.contact_number}
                                    value={values.contact_number}
                                />
                            </div>
                            <div style={{ width: "100%" }} className="mb-3">
                                <Element
                                    eletype={inputType.input}
                                    label="email"
                                    placeholder="Enter your email id"
                                    inputProps={{
                                        onChange: handleChange,
                                        onBlur: handleBlur,
                                        name: "email",
                                    }}
                                    errorText={touched.email && errors.email}
                                    value={values.email}
                                />
                            </div>
                            <div style={{ width: "100%" }} className="mb-3">
                                <Element
                                    eletype={inputType.input}
                                    label="Facebook"
                                    placeholder="Enter the facebook account information"
                                    inputProps={{
                                        onChange: handleChange,
                                        onBlur: handleBlur,
                                        name: "facebook_account",
                                    }}
                                    errorText={touched.facebook_account && errors.facebook_account}
                                    value={values.facebook_account}
                                />
                            </div>

                            <div style={{ width: "100%" }} className="mb-3">
                                <Element
                                    eletype={inputType.input}
                                    label="Instagram"
                                    placeholder="Enter the Instagram account information"
                                    inputProps={{
                                        onChange: handleChange,
                                        onBlur: handleBlur,
                                        name: "instagram_account",
                                    }}
                                    errorText={touched.instagram_account && errors.instagram_account}
                                    value={values.instagram_account}
                                />
                            </div>

                            <div style={{ width: "100%" }} className="mb-3 custom-datepicker">
                                <Element
                                    eletype={inputType.date}
                                    label="Please select date of birth"
                                    placeholder="Please select date of birth"
                                    inputProps={{
                                        onChange: handleChange,
                                        onBlur: handleBlur,
                                        name: "dob",
                                    }}
                                    errorText={touched.dob && errors.dob}
                                    value={values.dob}
                                />
                            </div>

                            <div style={{ width: "100%" }} className="mb-3 custom-datepicker">
                                <Element
                                    eletype={inputType.date}
                                    label="Please select date of delivery"
                                    placeholder="Please select date of delivery"
                                    inputProps={{
                                        onChange: handleChange,
                                        onBlur: handleBlur,
                                        name: "date_of_delivery",
                                    }}
                                    errorText={touched.date_of_delivery && errors.date_of_delivery}
                                    value={values.date_of_delivery}
                                />
                            </div>
                            <div style={{ width: "100%" }} className="mb-3 custom-datepicker">
                                <Element
                                    eletype={inputType.textarea}
                                    label="Enquired details"
                                    placeholder="please enter your enquiry"
                                    inputProps={{
                                        onChange: handleChange,
                                        onBlur: handleBlur,
                                        name: "enquiry",
                                    }}
                                    errorText={touched.enquiry && errors.enquiry}
                                    value={values.enquiry}
                                />
                            </div>

                        </div>
                        <div style={{ textAlign: "right" }}>
                            <button style={{ margin: "5px" }} onClick={() => { setLgShow(false); fncResetModalState(false); }} type="button" className="btn btn-outline-theme btn-lg">Cancel</button>

                            <button className="btn btn-outline-theme btn-lg" type="submit" variant="contained">
                                {modalEditData?.id !== undefined ? "Update Buyer" : "Add Buyer"}
                            </button>
                        </div>
                    </form>
                    {isBuyerAdded &&
                        <BuyersOrder fncApiCall={fncApiCall} buyerid={buyerid} isNewDone={isNewDone} data={modalEditData} fncGetOrderId={fncGetOrderId}  orderID={orderID}/>
                    }

                    {
                        isOrderPlaced &&
                        <UploadBuyersImages fncCloseModel={fncCloseModel} fncApiCall={fncApiCall} buyerid={buyerid} data={modalEditData} isNewDone={isNewDone} />
                    }

                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddBuyerModal;
