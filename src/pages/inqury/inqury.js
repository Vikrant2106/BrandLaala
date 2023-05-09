import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardExpandToggler,
  CardHeader,
} from "../../components/card/card.jsx";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import TestTable from "../../components/table/SortingTable.js";
import MOCK_DATA_BUYERS from "../../fakedata/MOCK_DATA_BUYERS.json";
import AddCustomerModal from "../../modal/AddCustomerModal.js";


function Inquiry() {
  const [startDate, setStartDate] = useState(new Date());
  const [isShow, setIsShow] = useState(false);
  const [enquiryData, setEnquiryData] = useState([]);

  async function doGetRequest() {
    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}enquiries`
    );
    console.log("data",res?.data?.data)
    setEnquiryData(res?.data?.data)
  }

  function fncChangeState(s)
  {
    setIsShow(false)
  } 

  useEffect(() => {
    doGetRequest();
  }, []);
 
  return (
    <Fragment>
      <Card className="mb-3">
     
     
      <CardBody>
       
          <CardHeader  style={{textAlign:"right"}} className="mb-3 mt-3">
            <div className="row">
              <div className="col-md-4">
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
              </div>
              <div className="col-md-4">
              <DatePicker
              selected={startDate}
              // onSelect={getPortData}
              >
              </DatePicker>
              </div>
              <div className="col-md-4">
              <button  onClick={() => setIsShow(true)} type="button" className="btn btn-outline-theme btn-lg">Add Customer</button>
              </div>
            </div>
  

    </CardHeader>
    {
      enquiryData.length>0 && 
    <TestTable tData={enquiryData} />
    }
    
        </CardBody>
      </Card>

      {
        isShow &&  <AddCustomerModal fncChangeState={fncChangeState} isShow={isShow}/>
      }
    
    </Fragment>
  );
}
export default Inquiry;
