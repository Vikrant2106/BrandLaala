import React, { Fragment, useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardExpandToggler,
    CardHeader,
} from "../../components/card/card.jsx";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Element from "../../components/Form/Element.js";
import { inputType } from "../../components/utils/enum.js";
import { Formik, FieldArray } from "formik";
import { buyersValidationSchema } from "../../components/utils/validation.js";
import AddBuyerModal from "../../modal/AddBuyerModal.js";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { successToast } from "../../components/toast/toast.js";


const ddlOptions = [
    {
        value: "Jwahar",
        label: "Jwahar",
        color:"blue",
    },
    {
        value: "Jacket",
        label: "Jacket",
        color:"red",
    },
    {
        value: "Pant",
        label: "Pant",
        color:"green",
    },
    {
        value: "Coat",
        label: "Coat",
        color:"purple",
    },
    {
        value: "Kurta",
        label: "kurta",
        color:"orange",
    },
    {
        value: "Shirt",
        label: "Shirt",
        color:"brown",
    },
    {
        value: "Sherwani",
        label: "Sherwani",
        color:"pink",
    },
    {
        value: "Indo",
        label: "Indo",
        color:"green",
    },
    {
        value: "Safari",
        label: "Safari",
        color:"blue",
    }
]

function BuyersOrder({ buyerid, fncGetOrderId, data, isNewDone, orderID, fncApiCall }) {

    const [isVisible, setIsVisible] = useState(false);
    const [initData, setinitData] = useState({});


    console.log("data",data)
    var INIT_STATE = {
        service: isNewDone ? {
            data: [{
                garment_type: "",
                Jwahar_Length: "",
                Jacket_Length: "",
                Pant_Length: "",
                Coat_Length: "",
                Kurta_Length: "",
                Shirt_Length: "",
                Aasan: "",
                Full_Aasan: "",
                Sherwani_Length: "",
                Indo_Length: "",
                Safari_Length: "",
                Weast: "",
                Hip: "",
                Thai: "",
                Pindli: "",
                Knee: "",
                Mori: "",
                Chest: "",
                Pet: "",
                Hip: "",
                Shoulders: "",
                Baju: "",
                Dola: "",
                Half_Back: "",
                Neck: ""
            }],
        } : initData
    };



    async function fncEditData() {
        if (!isNewDone) {
            let res = await axios.get(
                `${process.env.REACT_APP_API_URL}buyer/${data.id}`
            );
            debugger;
            var it = res?.data?.data?.orders[0].items
            let dn = [];
            for (var i = 0; i < it.length; i++) {
                dn.push(it[i])
            }
            debugger;
            setinitData({
                data: dn.length>0?dn: [{
                    garment_type: "",
                    Jwahar_Length: "",
                    Jacket_Length: "",
                    Pant_Length: "",
                    Coat_Length: "",
                    Kurta_Length: "",
                    Shirt_Length: "",
                    Aasan: "",
                    Full_Aasan: "",
                    Sherwani_Length: "",
                    Indo_Length: "",
                    Safari_Length: "",
                    Weast: "",
                    Hip: "",
                    Thai: "",
                    Pindli: "",
                    Knee: "",
                    Mori: "",
                    Chest: "",
                    Pet: "",
                    Hip: "",
                    Shoulders: "",
                    Baju: "",
                    Dola: "",
                    Half_Back: "",
                    Neck: ""
                }]
            })
            setIsVisible(true)
        }
        else {
            setIsVisible(true)
        }
    }
    
    useEffect(() => {
        fncEditData()
    }, [])

    async function handleSubmit(d) {
        // if (isNewDone) {
            debugger;
            var newData = [];
            for(var i =0; i<d.service.data.length; i++)
            {
                if(d.service.data[i].id == undefined)
                {
                    newData.push({id:uuidv4(),...d.service.data[i]})
                }
                else{
                    newData.push({...d.service.data[i]})
                }
            }
            let res = await axios.put(
                `${process.env.REACT_APP_API_URL}buyer_order/${buyerid == undefined ? data.id : buyerid}/${orderID!==""?orderID:data?.data?.orders[0]?._id}`, { data: { items: [...newData] } }
            );
            successToast("Order is successfully created")
            fncGetOrderId(res?.data?.data?._id)
            fncApiCall();
    }



    return (
        <Fragment>
            {isVisible &&
                <Card className="mt-4">
                    <Formik
                        enaleReinitialize={true}
                        initialValues={INIT_STATE}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, errors, handleSubmit, touched, handleBlur }) => (
                            <form width="100%" onSubmit={handleSubmit}>

                                {/* //---------------------------------------- Service -------------------------------------------------- */}
                                <div style={{ marginTop: "10px", borderTop: "1px solid grey", textAlign: "center" }}>
                                    <h5 className="mt-4" >Data to be added for the sizes</h5>
                                    <FieldArray
                                        name="service.data"
                                        render={(arrayHelpers) => (
                                            <div>
                                                {values.service.data &&
                                                    values.service.data.length > 0 &&
                                                    values.service.data.map((val, index) => (
                                                        <div key={index}>

                                                            <div className="row" style={{ margin: "1em" }}>
                                                                <div className="col-md-6">
                                                                    <select
                                                                        value={values.service.data[index].garment_type}
                                                                        name={`service.data.${index}.garment_type`}
                                                                        onChange={handleChange}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    >
                                                                        {
                                                                            ddlOptions.map((data) =>
                                                                                <option value={data.value}>{data.label}</option>
                                                                            )
                                                                        }
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-6" >
                                                                    {/* <span  name={`service.data.${index}.id`}>{values.service.data[index].id}</span> */}
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{ margin: "1em" }}
                                                                className="row mt-2"
                                                            >
                                                                <div className="col-md-4">
                                                                    <span style={{
                                                                        color: values.service.data[index].garment_type==ddlOptions[0].value?ddlOptions[0].color:"white",
                                                                        fontSize: values.service.data[index].garment_type==ddlOptions[0].value?"18px":"15px",
                                                                        fontWeight: values.service.data[index].garment_type==ddlOptions[0].value?"600":"500",
                                                                        }}>Please type Jwahar Length</span>
                                                                    <input
                                                                        placeholder="Please type Jwahar Length"
                                                                        value={values.service.data[index].Jwahar_Length}
                                                                        name={`service.data.${index}.Jwahar_Length`}
                                                                        onChange={handleChange}
                                                                        maxLength={30}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span
                                                                    style={{
                                                                        color: values.service.data[index].garment_type==ddlOptions[1].value?ddlOptions[1].color:"white",
                                                                        fontSize: values.service.data[index].garment_type==ddlOptions[1].value?"18px":"15px",
                                                                        fontWeight: values.service.data[index].garment_type==ddlOptions[1].value?"600":"500",
                                                                    }}
                                                                    >Please type Jacket Length</span>
                                                                    <input
                                                                        placeholder="TPlease type Jacket Length"
                                                                        value={values.service.data[index].Jacket_Length}
                                                                        name={`service.data.${index}.Jacket_Length`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span
                                                                     style={{
                                                                        color: values.service.data[index].garment_type==ddlOptions[2].value?ddlOptions[2].color:"white",
                                                                        fontSize: values.service.data[index].garment_type==ddlOptions[2].value?"18px":"15px",
                                                                        fontWeight: values.service.data[index].garment_type==ddlOptions[2].value?"600":"500",
                                                                    }}
                                                                    >Please type Pant Length</span>
                                                                    <input
                                                                        placeholder="Please type Pant Length"
                                                                        value={values.service.data[index].Pant_Length}
                                                                        name={`service.data.${index}.Pant_Length`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <br />
                                                                {/* ---------------- 2  row ----------- */}
                                                                <div className="col-md-4">
                                                                    <span
                                                                     style={{
                                                                        color: values.service.data[index].garment_type==ddlOptions[3].value?ddlOptions[3].color:"white",
                                                                        fontSize: values.service.data[index].garment_type==ddlOptions[3].value?"18px":"15px",
                                                                        fontWeight: values.service.data[index].garment_type==ddlOptions[3].value?"600":"500",
                                                                    }}
                                                                    >Please type Coat Length</span>
                                                                    <input
                                                                        placeholder="Please type Coat Length"
                                                                        value={values.service.data[index].Coat_Length}
                                                                        name={`service.data.${index}.Coat_Length`}
                                                                        onChange={handleChange}
                                                                        maxLength={30}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span 
                                                                     style={{
                                                                        color: values.service.data[index].garment_type==ddlOptions[4].value?ddlOptions[4].color:"white",
                                                                        fontSize: values.service.data[index].garment_type==ddlOptions[4].value?"18px":"15px",
                                                                        fontWeight: values.service.data[index].garment_type==ddlOptions[4].value?"600":"500",
                                                                    }}
                                                                    >Please type Kurta Length</span>
                                                                    <input
                                                                        placeholder="Please type Kurta Length"
                                                                        value={values.service.data[index].Kurta_Length}
                                                                        name={`service.data.${index}.Kurta_Length`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span
                                                                     style={{
                                                                        color: values.service.data[index].garment_type==ddlOptions[5].value?ddlOptions[5].color:"white",
                                                                        fontSize: values.service.data[index].garment_type==ddlOptions[5].value?"18px":"15px",
                                                                        fontWeight: values.service.data[index].garment_type==ddlOptions[5].value?"600":"500",
                                                                    }}
                                                                    >Please type Shirt Length</span>
                                                                    <input
                                                                        placeholder="Please type Shirt Length"
                                                                        value={values.service.data[index].Shirt_Length}
                                                                        name={`service.data.${index}.Shirt_Length`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <br />
                                                                {/* ------------------- 2nd Row ends here ----------------------------- */}
                                                                {/* ---------------- 3  row ----------- */}
                                                                <div className="col-md-4">
                                                                    <span
                                                                      style={{
                                                                        color: values.service.data[index].garment_type==ddlOptions[6].value?ddlOptions[6].color:"white",
                                                                        fontSize: values.service.data[index].garment_type==ddlOptions[6].value?"18px":"15px",
                                                                        fontWeight: values.service.data[index].garment_type==ddlOptions[6].value?"600":"500",
                                                                    }}
                                                                    >Please type Sherwani Length</span>
                                                                    <input
                                                                        placeholder="Please type Sherwani Length"
                                                                        value={values.service.data[index].Sherwani_Length}
                                                                        name={`service.data.${index}.Sherwani_Length`}
                                                                        onChange={handleChange}
                                                                        maxLength={30}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span
                                                                      style={{
                                                                        color: values.service.data[index].garment_type==ddlOptions[7].value?ddlOptions[7].color:"white",
                                                                        fontSize: values.service.data[index].garment_type==ddlOptions[7].value?"18px":"15px",
                                                                        fontWeight: values.service.data[index].garment_type==ddlOptions[7].value?"600":"500",
                                                                    }}
                                                                    >Please type Indo Length</span>
                                                                    <input
                                                                        placeholder="Please type Indo Length"
                                                                        value={values.service.data[index].Indo_Length}
                                                                        name={`service.data.${index}.Indo_Length`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span
                                                                      style={{
                                                                        color: values.service.data[index].garment_type==ddlOptions[8].value?ddlOptions[8].color:"white",
                                                                        fontSize: values.service.data[index].garment_type==ddlOptions[8].value?"18px":"15px",
                                                                        fontWeight: values.service.data[index].garment_type==ddlOptions[8].value?"600":"500",
                                                                    }}
                                                                    >Please type Safari Length</span>
                                                                    <input
                                                                        placeholder="Please type Safari Length"
                                                                        value={values.service.data[index].Safari_Length}
                                                                        name={`service.data.${index}.Safari_Length`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <br />
                                                                {/* ------------------- 3rd Row ends here ----------------------------- */}
                                                                {/* ---------------- 4  row ----------- */}
                                                                <div className="col-md-4">
                                                                    <span>Please type Chest</span>
                                                                    <input
                                                                        placeholder="Please type Chest"
                                                                        value={values.service.data[index].Chest}
                                                                        name={`service.data.${index}.Chest`}
                                                                        onChange={handleChange}
                                                                        maxLength={30}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span>Please type Pet</span>
                                                                    <input
                                                                        placeholder="Please type Pet"
                                                                        value={values.service.data[index].Pet}
                                                                        name={`service.data.${index}.Pet`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span>Please type Hip</span>
                                                                    <input
                                                                        placeholder="Please type Hip"
                                                                        value={values.service.data[index].Hip}
                                                                        name={`service.data.${index}.Hip`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <br />
                                                                {/* ------------------- 4th Row ends here ----------------------------- */}
                                                                {/* ---------------- 5  row ----------- */}
                                                                <div className="col-md-4">
                                                                    <span>Please type Shoulders</span>
                                                                    <input
                                                                        placeholder="Please type Shoulders"
                                                                        value={values.service.data[index].Shoulders}
                                                                        name={`service.data.${index}.Shoulders`}
                                                                        onChange={handleChange}
                                                                        maxLength={30}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span>Please type Baju</span>
                                                                    <input
                                                                        placeholder="Please type Baju"
                                                                        value={values.service.data[index].Baju}
                                                                        name={`service.data.${index}.Baju`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span>Please type Dola</span>
                                                                    <input
                                                                        placeholder="Please type Dola"
                                                                        value={values.service.data[index].Dola}
                                                                        name={`service.data.${index}.Dola`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <br />
                                                                {/* ------------------- 5th Row ends here ----------------------------- */}
                                                                {/* ---------------- 6  row ----------- */}
                                                                <div className="col-md-4">
                                                                    <span>Please type Half Back</span>
                                                                    <input
                                                                        placeholder="Please type HB"
                                                                        value={values.service.data[index].Half_Back}
                                                                        name={`service.data.${index}.Half_Back`}
                                                                        onChange={handleChange}
                                                                        maxLength={30}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span>Please type Neck</span>
                                                                    <input
                                                                        placeholder="Please type Neck"
                                                                        value={values.service.data[index].Neck}
                                                                        name={`service.data.${index}.Neck`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span>Please type Aasan</span>
                                                                    <input
                                                                        placeholder="Please type Aasan"
                                                                        value={values.service.data[index].Aasan}
                                                                        name={`service.data.${index}.Aasan`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <br />
                                                                {/* ------------------- 6th Row ends here ----------------------------- */}
                                                                {/* ---------------- 7 row ----------- */}
                                                                <div className="col-md-4">
                                                                    <span>Please type Full Aasan</span>
                                                                    <input
                                                                        placeholder="Please type Full Aasan"
                                                                        value={values.service.data[index].Full_Aasan}
                                                                        name={`service.data.${index}.Full_Aasan`}
                                                                        onChange={handleChange}
                                                                        maxLength={30}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span>Please type Weast</span>
                                                                    <input
                                                                        placeholder="Please type Weast"
                                                                        value={values.service.data[index].Weast}
                                                                        name={`service.data.${index}.Weast`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span>Please type HIP</span>
                                                                    <input
                                                                        placeholder="Please type HIP"
                                                                        value={values.service.data[index].Hip}
                                                                        name={`service.data.${index}.Hip`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <br />
                                                                {/* ------------------- 7th Row ends here ----------------------------- */}
                                                                {/* ---------------- 8th  row ----------- */}
                                                                <div className="col-md-4">
                                                                    <span>Please type Thai</span>
                                                                    <input
                                                                        placeholder="Please type Thai"
                                                                        value={values.service.data[index].Thai}
                                                                        name={`service.data.${index}.Thai`}
                                                                        onChange={handleChange}
                                                                        maxLength={30}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span>Please type Pindli</span>
                                                                    <input
                                                                        placeholder="Please type Pindli"
                                                                        value={values.service.data[index].Pindli}
                                                                        name={`service.data.${index}.Pindli`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <span>Please type Knee</span>
                                                                    <input
                                                                        placeholder="Please type Knee"
                                                                        value={values.service.data[index].Knee}
                                                                        name={`service.data.${index}.Knee`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <br />
                                                                <br />
                                                                <br />
                                                                <br />
                                                                {/* ------------------- 8th Row ends here ----------------------------- */}

                                                                {/* ---------------- 9  row ----------- */}
                                                                <div className="col-md-4">
                                                                    <span>Please type Mori</span>
                                                                    <input
                                                                        placeholder="Please type Mori"
                                                                        value={values.service.data[index].Mori}
                                                                        name={`service.data.${index}.Mori`}
                                                                        onChange={handleChange}
                                                                        maxLength={30}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-md-6"> </div>
                                                                <div className="col-md-6" style={{ textAlign: "right" }}>
                                                                    <span
                                                                        style={{ padding: "10px", fontSize: "17px", margin: "2px 5px 2px 5px" }}
                                                                        className="fas fa-plus  bg-white bg-opacity-5"
                                                                        onClick={(data) => {
                                                                            arrayHelpers.push({
                                                                                garment_type: "",
                                                                                Jwahar_Length: "",
                                                                                Jacket_Length: "",
                                                                                Pant_Length: "",
                                                                                Coat_Length: "",
                                                                                Kurta_Length: "",
                                                                                Shirt_Length: "",
                                                                                Aasan: "",
                                                                                Full_Aasan: "",
                                                                                Sherwani_Length: "",
                                                                                Indo_Length: "",
                                                                                Safari_Length: "",
                                                                                Weast: "",
                                                                                Hip: "",
                                                                                Thai: "",
                                                                                Pindli: "",
                                                                                Knee: "",
                                                                                Mori: "",
                                                                                Chest: "",
                                                                                Pet: "",
                                                                                Hip: "",
                                                                                Shoulders: "",
                                                                                Baju: "",
                                                                                Dola: "",
                                                                                Half_Back: "",
                                                                                Neck: ""
                                                                            });
                                                                        }}
                                                                    >

                                                                    </span>
                                                                    {index !== 0 && (
                                                                        <span
                                                                            style={{ padding: "10px", fontSize: "17px", margin: "2px 5px 2px 5px" }}
                                                                            className="fas fa-minus  bg-white bg-opacity-5"
                                                                            onClick={() => {
                                                                                arrayHelpers.remove(index);
                                                                            }}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    />
                                </div>
                                {/* ///------------------------------------------------ Service ends here-----------------------------------------------------/ */}

                                <div style={{ textAlign: "right", padding: "10px", margin: "3em" }}>
                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-outline-theme btn-lg"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </Card>
            }
        </Fragment>
    );
}

export default BuyersOrder;
