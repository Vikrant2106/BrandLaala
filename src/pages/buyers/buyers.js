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
import { buyersValidationSchema } from "../../components/utils/validation.js";


const tableHeaderBuyers = [
  "First Name",
  "Last Name",
  "Email",
  "Mobile Number",
  "Address"
];
function Buyers() {
  const [startDate, setStartDate] = useState(new Date());
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const INIT_STATE = {
    first_name:"",
    last_name:"",
    email:"",
    mobile:"",
    facebook_account:"",
    instagram_account:"",
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
    validationSchema: buyersValidationSchema,
  });


  function onSubmit(data) {
    console.log(data)
   
   
  }
  return (
    <Fragment>
      <Card className="mb-3">
     
     

      <CardBody>
       
          <CardHeader  style={{textAlign:"right"}} className="mb-3 mt-3">

          <button  onClick={() => setLgShow(true)} type="button" className="btn btn-outline-theme btn-lg">Add Buyers</button>
    </CardHeader>
          <Card>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                   
                   {tableHeaderBuyers?.map((data,i)=>
                   <th key={i}>
                    {data}
                   </th>
                   )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span  onClick={() => setLgShow(true)} style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>
                  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span   onClick={() => setLgShow(true)} style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span  onClick={() => setLgShow(true)} style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span  onClick={() => setLgShow(true)} style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span  onClick={() => setLgShow(true)} style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span  onClick={() => setLgShow(true)} style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span   onClick={() => setLgShow(true)} style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span  onClick={() => setLgShow(true)} style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span  onClick={() => setLgShow(true)} style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span  onClick={() => setLgShow(true)} style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span  onClick={() => setLgShow(true)} style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span  onClick={() => setLgShow(true)} style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>  <tr>
                    <td class="noBorder">Vinod</td>
                    <td class="noBorder">Joshi</td>
                    <td class="noBorder">Vinod@gamil.com</td>
                    <td class="noBorder">9876543210</td>
                    <td class="noBorder">Delhi Cantt</td>
                    <td>
                      <span onClick={() => setLgShow(true)}  style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
                      <span className="bi bi-trash" ></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </CardBody>
      </Card>

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
    
    </Fragment>
  );
}
export default Buyers;
