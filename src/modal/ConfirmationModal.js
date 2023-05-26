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
import axios from 'axios';
import { successToast,failureToast
 } from '../components/toast/toast.js';


function ConfirmationModal({isShowConfirmationModal,fncOnOKClick, fncsetIsShowConfirmationModal}) {
   
	
	return (
		<>
        <Modal
        size="xs"
        show={isShowConfirmationModal}
        onHide={()=>fncsetIsShowConfirmationModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Delete Record
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <p>Are you sure you want to delete record ?</p> 
       <div style={{textAlign:"right"}}>
          <button style={{margin:"5px"}}  onClick={()=>fncsetIsShowConfirmationModal(false)}  type="button" className="btn btn-outline-theme btn-lg">Cancel</button>
     
          <button  onClick={()=>fncOnOKClick(false)} className="btn btn-outline-theme btn-lg" type="submit" variant="contained">
            Ok 
              </button>
          </div>
        </Modal.Body>
      </Modal>
        </>
	)
}

export default ConfirmationModal;
