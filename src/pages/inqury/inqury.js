import React, { Fragment, useState, useEffect, useCallback } from "react";
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
import { toast } from 'react-toastify';
import _debounce from 'lodash/debounce';
import DateRangePicker from "react-bootstrap-daterangepicker";
import { set } from "lodash";







function Inquiry() {
  const [endDatedata, setEndDate] = useState(new Date());
  const [isShow, setIsShow] = useState(false);
  const [enquiryData, setEnquiryData] = useState([]);
  const [modalEditData, setModalEditData] = useState({});
  const [searchedData, setSearchedData] = useState("");
  const [searchedDataMobile, setSearchedDataMobile] = useState("");
  const [startDatedata, setStartDate] = useState(() => {
    var d = new Date();
    var day = d.getDate() - 30;
    d.setDate(day);
    return d;
  });

  function dateFormatter(d) {
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${ye}-${mo}-${da}`;
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), [searchedData, startDatedata, endDatedata]);
  const debounceFnMobile = useCallback(_debounce(handleDebounceFnMobile, 1000), [searchedDataMobile]);


  async function handleDebounceFn(inputValue,startdate,endDate) {

    var res = await axios.get(`${process.env.REACT_APP_API_URL}search/enquiries/?query=${inputValue}&from=${startdate}&to=${endDate}`)
    setEnquiryData(res?.data?.data)
  }

  async function handleDebounceFnMobile(inputValue) {
  
    var res = await axios.get(`${process.env.REACT_APP_API_URL}search/enquiries/mobile_number/?query=${inputValue}`)
    setEnquiryData(res?.data?.data);
 

  }

  


  async function doGetRequest() {
    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}enquiries/`
    );
    setEnquiryData(res?.data?.data)
  }

  function fncEditModalData(rowdata) {

    let { _id, ...userData } = rowdata;
  
    let dob = userData?.dob.split("T")[0].split("-")[0]+"-"+
    userData?.dob.split("T")[0].split("-")[1]+"-"+
    userData?.dob.split("T")[0].split("-")[2];
    let d = new Date(dob);
    setModalEditData({
      id: _id,
      data: { ...userData, dob:  d }
    })
    setIsShow(true)
  }

  function fncApiCall() {
    doGetRequest();
  }

  useEffect(() => {
    doGetRequest();
  }, []);

  function fncShowModal() {
    setModalEditData({});
    setIsShow(true);
  }

  function fncResetModalState(st) {
    setIsShow(st);
  }

  function fncOnChangeInput(e) {
    setSearchedData(e.target.value);
    debounceFn(e.target.value,dateFormatter(startDatedata),dateFormatter(endDatedata))
  }

  function fncOnChangeInputPhone(e) {
    setSearchedDataMobile(e.target.value);
    debounceFnMobile(e.target.value)
  }

  function handleEvent(event, { startDate, endDate }) {
    setStartDate(startDate._d);
    setEndDate(endDate._d);
    debounceFn(searchedData,startDate.format("YYYY-MM-DD"),endDate.format("YYYY-MM-DD")) 
  }




  return (
    <Fragment>
      <Card className="mb-3">


        <CardBody>

          <CardHeader style={{ textAlign: "right" }} className="mb-3 mt-3">
            <div className="row">
              <div className="col-md-3 mb-2">
                <input type="text" onChange={fncOnChangeInput} value={searchedData} className="form-control" id="exampleFormControlInput1" placeholder="Please search name" />
              </div>
              <div className="col-md-3 mb-2">
                <input type="text" onChange={fncOnChangeInputPhone} value={searchedDataMobile} className="form-control" id="exampleFormControlInput1" placeholder="Please search contact number" />
              </div>
              <div className="col-md-3 mb-2">
                <DateRangePicker
                  onApply={handleEvent}
                  initialSettings={{
                    startDate: startDatedata,
                    endDate: endDatedata,
                  }}
                >
                  <input type="text" className=" datePickerInput form-control" />
                </DateRangePicker>
              </div>
             
              <div className="col-md-3 mb-2">
                <button onClick={fncShowModal} type="button" className="btn btn-outline-theme btn-lg">Add Customer</button>
              </div>
            </div>


          </CardHeader>
        
          {
            enquiryData.length > 0 &&
            <TestTable fncApiCall={fncApiCall} fncEditModalData={fncEditModalData} tData={enquiryData} />
          }
      
        </CardBody>
      </Card>
      {
        <AddCustomerModal fncApiCall={fncApiCall} modalEditData={modalEditData} isShow={isShow} fncResetModalState={fncResetModalState} />
      }
    </Fragment>
  );
}
export default Inquiry;
