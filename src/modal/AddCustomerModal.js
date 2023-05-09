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
import { inquiryValidationSchema } from "../components/utils/validation.js";


function AddCustomerModal({fncChangeState,isShow}) {
    const [lgShow, setLgShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(()=>{
        setLgShow(isShow)
    },[isShow])

    const INIT_STATE = {
        first_name:"",
        last_name:"",
        email:"",
        mobile:"",
        start_date:startDate,
      };
    
    
      const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
      useFormik({
        enableReinitialize: true,
        initialValues: false
          ? {
            
            }
          : INIT_STATE,
        onSubmit: onSubmit,
        validationSchema: inquiryValidationSchema,
      });
    
    
      function onSubmit(data) {
        console.log(data)
       
       
      }
	
	return (
		<>
        <Modal
        size="md"
        show={lgShow}
        onHide={() => setLgShow(false)}
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
          <Card style={{width:"100%"}} className="mb-3">
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
          </Card>
          <Card style={{width:"100%"}} className="mb-3">
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
          </Card>
          <Card style={{width:"100%"}} className="mb-3">
          <Element
                eletype={inputType.number}
                label="mobile"
                placeholder="Enter your mobile number"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur,
                  name: "mobile",
                }}
                errorText={touched.mobile && errors.mobile}
                value={values.mobile}
              />
          </Card>
          <Card style={{width:"100%"}} className="mb-3">
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
          </Card>
          <Card style={{width:"100%"}} className="mb-3">
 
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
          </Card>
          <Card style={{width:"100%"}} className="mb-3">
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
          </Card>
          <Card style={{width:"100%"}} className="mb-3 custom-datepicker">
          <Element
                eletype={inputType.date}
                label="Please select a date"
                placeholder="Please select a date"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur,
                  name: "start_date",
                }}
                errorText={touched.start_date && errors.start_date}
                value={values.start_date}
              />
          </Card>
          </div>
          <div style={{textAlign:"right"}}>
          <button style={{margin:"5px"}}  onClick={() => setLgShow(false)} type="button" className="btn btn-outline-theme btn-lg">Cancel</button>
     
          <button className="btn btn-outline-theme btn-lg" type="submit" variant="contained">
                Add Buyers
              </button>
          </div>
          </form>
        </Modal.Body>
      </Modal>
        </>
	)
}

export default AddCustomerModal;
