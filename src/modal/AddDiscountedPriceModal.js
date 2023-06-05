import React, { Fragment, useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardExpandToggler,
    CardHeader,
} from "../components/card/card.jsx";
import Modal from 'react-bootstrap/Modal';
import { Formik, FieldArray } from "formik";
import { v4 as uuidv4 } from 'uuid';
import { successToast } from "../components/toast/toast.js";
import { defaultAxios } from "../components/utils/axios/default.axios.js";

  

function AddDiscountedPriceModal({ data,isDiscountShow ,fncShowHideDiscount, fncApiCall}) {

    const [isVisible, setIsVisible] = useState(false);

   function fncCreateInitData(d)
    {
        var newData =[]
        for(var i=0 ;i <d.orders[0].items.length; i++)
        {   
            newData.push({
                garment_type: d.orders[0].items[i].garment_type,
                asked_price: d.orders[0].items[i].asked_price?d.orders[0].items[i].asked_price:"",
                sale_price: d.orders[0].items[i].sale_price?d.orders[0].items[i].sale_price:"",
                id:d.orders[0].items[i].id
            })
        }
        return newData;
    }
    var INIT_STATE = {
        service: data ?{data:fncCreateInitData(data) }  : {
            data: [{
                garment_type: "",
                asked_price: "",
                sale_price: "",
            }],
        }
    };
    
    useEffect(() => {
        setIsVisible(true);
    }, [data])

    async function handleSubmit(d) {
             
            var newData=[]
            for(var i =0; i< d.service.data.length ; i++)
            {
                newData.push({
                    id:d.service.data[i].id,
                    asked_price: d.service.data[i].asked_price,
                    sale_price:  d.service.data[i].sale_price,
                })
            }
            let res = await defaultAxios.put(
                `${process.env.REACT_APP_API_URL}update/order_price/${data._id}/${data?.orders[0]._id}/`, { data:newData}
            );
            if(res?.data?.status===1){
                successToast("Order price updated successfully");
                fncShowHideDiscount(true);
                fncApiCall();
            }
           
       
    }



    return (
        <Fragment>
             <Modal
                size="xl"
                show={isDiscountShow}
                onHide={fncShowHideDiscount}
                aria-labelledby="example-modal-sizes-title-lg"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                       Add Product Prices
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                <div style={{ marginTop: "10px", textAlign: "center" }}>
                        
                                   
                                    <FieldArray
                                        name="service.data"
                                        render={(arrayHelpers) => (
                                            <div>
                                                {values.service.data &&
                                                    values.service.data.length > 0 &&
                                                    values.service.data.map((val, index) => (
                                                        <div key={index}>

                                                            <div className="row" style={{ margin: "1em" }}>
                                                                <div className="col-md-12" style={{textAlign:"left", fontSize:"24px"}}>
                                                                   <span>{values.service.data[index].garment_type}</span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{ margin: "1em" }}
                                                                className="row mt-2"
                                                            >
                                                               
                                                                <div className="col-md-6">
                                                                    {/* <span>Please enter asked price</span> */}
                                                                    <input
                                                                        placeholder="TPlease type asked price"
                                                                        value={values.service.data[index].asked_price}
                                                                        name={`service.data.${index}.asked_price`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    {/* <span>Please enter selling price</span> */}
                                                                    <input
                                                                        placeholder="Please type selling price"
                                                                        value={values.service.data[index].sale_price}
                                                                        name={`service.data.${index}.sale_price`}
                                                                        onChange={handleChange}
                                                                        maxLength={1000}
                                                                        className="form-control form-control-lg bg-white bg-opacity-5"
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* <div className="row mt-2">
                                                                <div className="col-md-6"> </div>
                                                                <div className="col-md-6" style={{ textAlign: "right" }}>
                                                                    <span
                                                                        style={{ padding: "10px", fontSize: "17px", margin: "2px 5px 2px 5px" }}
                                                                        className="fas fa-plus  bg-white bg-opacity-5"
                                                                        onClick={(data) => {
                                                                            arrayHelpers.push({
                                                                                garment_type: "",
                                                                                asked_price: "",
                                                                                sale_price: "",
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
                                                            </div> */}
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
            </Modal.Body>
      </Modal>
        </Fragment>
    );
}

export default AddDiscountedPriceModal;
