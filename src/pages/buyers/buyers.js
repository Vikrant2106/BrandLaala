import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
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
import AddBuyerModal from "../../modal/AddBuyerModal.js";
import axios from "axios";
import { successToast } from "../../components/toast/toast.js";
import ConfirmationModal from "../../modal/ConfirmationModal.js";
import ImageGalleryModal from "../../modal/ImageGalleryModal.js";
import TailorForm from "./tailorForm.js";
import AddDiscountedPriceModal from "../../modal/AddDiscountedPriceModal.js";
import _debounce from 'lodash/debounce';
import DateRangePicker from "react-bootstrap-daterangepicker";


const tableHeaderBuyers = [
  "images",
  "First Name",
  "Last Name",
  "Email",
  "Mobile Number",
  "Facebook Link",
  "Instagram Link",
  "DOB",
  "Visited Date",
  "Delivery Date",
  "Is Order Delivered",
  "Is Order Completed",
  "Remarks",
  "Print",
  "Action"
];
function Buyers() {
  const [isShow, setIsShow] = useState(false);
  const [pageSize, setPageSize] =  useState(10);
  const [page, setPage] =  useState("1");
  const [pageLength, setPageLength] =  useState(null);
  const [modalEditData, setModalEditData] = useState({});
  const [buyersData, setBuyersData] = useState([]);
  const [buyersDataBackUp, setBuyersDataBackUp] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false)
  const [imageGalleryShow, setImageGalleryShow] = useState(false)
  const [selectedDeleteId, setSelectedDeleteId] = useState();
  const [id, setId] = useState();
  const [isDiscountShow, setIsDiscountShow] = useState(false)
  const [discountData, setDiscountData] = useState(false)
  const [searchedData, setSearchedData] = useState("");
  const [searchedDataMobile, setSearchedDataMobile] = useState("");
  const [endDatedata, setEndDate] = useState(new Date());
  // const [printData, setPrintData] = useState(null);
  // const [isPrintVisible, setIsPrintVisible] = useState(false);
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
  
   
  const search = useLocation().search;
  const paramPage = new URLSearchParams(search).get('page');
  const paramLimit = new URLSearchParams(search).get('limit');

  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), [searchedData, startDatedata, endDatedata]);
  const debounceFnMobile = useCallback(_debounce(handleDebounceFnMobile, 1000), [searchedDataMobile]);

  
  async function handleDebounceFn(inputValue,startdate,endDate) {
    var res = await axios.get(`${process.env.REACT_APP_API_URL}search/buyers/?query=${inputValue}&from=${startdate}&to=${endDate}`)
    setBuyersData(res?.data?.data);
   setBuyersDataBackUp(res?.data?.data);

  }

  function handleEvent(event, { startDate, endDate }) {
    setStartDate(startDate._d);
    setEndDate(endDate._d);
     debounceFn(searchedData,startDate.format("YYYY-MM-DD"),endDate.format("YYYY-MM-DD"))
   }

   async function handleDebounceFnMobile(inputValue) {
    var res = await axios.get(`${process.env.REACT_APP_API_URL}search/buyers/mobile_number/?query=${inputValue}`)
    setBuyersData(res?.data?.data);
    setBuyersDataBackUp(res?.data?.data);
  }

  useEffect(() => {
    doGetRequest();
    setPageSize(paramLimit);
    setPage(paramPage);
  }, [])

  function fncTimeStampFormatDate(dod)
  {
    return dod?.split("T")[0].split("-")[2]+"-"+
    dod?.split("T")[0].split("-")[1]+"-"+
    dod?.split("T")[0].split("-")[0]
  }

  function fncIndianTimeFormat(dod)
  {
    return dod?.split("-")[2]+"-"+
    dod?.split("-")[1]+"-"+
    dod?.split("-")[0]
  }

  async function doGetRequest() {
    let res = await axios .get(
      `${process.env.REACT_APP_API_URL}buyers/`
    );
    fncSlicePageData(res?.data?.data);
    // setBuyersData(res?.data?.data)
    // setBuyersDataBackUp(res?.data?.data);
  }
  function fncResetModalState(st) {
    setIsShow(st);
  }

  function fncApiCall() {
    doGetRequest()
  }

  function fncShowModal() {
    setModalEditData({});
    setIsShow(true);
    setIsNew(true)
  }

  function fncDeleteBuyer(id) {
    setSelectedDeleteId(id)
    fncsetIsShowConfirmationModal(true)
  }

  function fncsetIsShowConfirmationModal(data) {
    setIsShowConfirmationModal(data)
  }

  async function deleteEnquiryData() {
    let res = await axios.delete(
      `${process.env.REACT_APP_API_URL}buyer/${selectedDeleteId}`
    );
    return res?.data;
  }


  async function fncOnOKClick(data) {
    var res = await deleteEnquiryData();
    if (res?.status === 1) {
      successToast(res?.message);
      fncsetIsShowConfirmationModal(data)
      fncApiCall();
    }
    else {
      successToast(res?.message);
    }

  }

  function fncViewImageGallery(data)
  {
    setImageGalleryShow(true);
    setId(data?._id);
  }


  async function fncEditData(data) {
    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}buyer/${data._id}`
    );
    let { _id,...userData} = res?.data?.data;
    let dob = userData?.dob.split("T")[0].split("-")[0]+"-"+
    userData?.dob.split("T")[0].split("-")[1]+"-"+
    userData?.dob.split("T")[0].split("-")[2];
    let d = new Date(dob);

    let date_of_delivery = userData?.date_of_delivery.split("T")[0].split("-")[0]+"-"+
    userData?.date_of_delivery.split("T")[0].split("-")[1]+"-"+
    userData?.date_of_delivery.split("T")[0].split("-")[2];
    let dod = new Date(date_of_delivery);
    setModalEditData({
      id: _id,
      data: { ...userData, dob:  d , date_of_delivery:dod}
    })
    setIsNew(false);
    setIsShow(true)
  }

  function fncCloseModal()
  {
    setImageGalleryShow(false)
  }

  function fncDiscountGiven(data)
  {
    setDiscountData(data);
    setIsDiscountShow(true);
  }

  function fncShowHideDiscount()
  {
    setIsDiscountShow(false);
  
  }

 async function fncOrderDelivered(data)
  {
    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}update/order_status/${data._id}/`,{"status":"is_delivered"}
    );
    if(res?.data?.status==1)
    {
      successToast("Order delivery status changed successfully");
      fncApiCall();
    }
  }

  async function fncOrderCompleted(data)
  {
    debugger;
    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}update/order_status/${data._id}/`,{
        "status":"is_order_completed"
      }
    );
    if(res?.data?.status==1)
    {
      successToast("Order completed status changed successfully");
      fncApiCall();
    }
  }

  function fncOnChangeInput(e) {
    setSearchedData(e.target.value);
    debounceFn(e.target.value,dateFormatter(startDatedata),dateFormatter(endDatedata))
  }

  // function fncPrintOrder(data)
  // {
  //   console.log("data",data);
  //   setPrintData(data);
  //   setIsPrintVisible(true)

  // } 
  function fncOnChangeInputPhone(e) {
    setSearchedDataMobile(e.target.value);
    debounceFnMobile(e.target.value)
  }

  function fncSlicePageData(d)
  {
    // let plength = Math.ceil(parseInt(d.length)/10);
    // setPageLength(plength);
    // let dd = d.slice(0, pageSize)
    setBuyersData(d);
    // setBuyersDataBackUp(d);
  }


  function fncChangePageSize(e)
  {
    let plength = Math.ceil(parseInt(buyersDataBackUp.length)/Number(e.target.value));
    setPageLength(plength);
    setPageSize(Number(e.target.value));
    let dd = buyersDataBackUp.slice(0, Number(e.target.value))
    setBuyersData(dd);
  }
  
  function fncPreviousPage()
  {
    let pp = parseInt(page)-1;
    setPage(pp);
  }
  
  function fncNextPage()
  {
    let pp = parseInt(page)+1;
    setPage(pp);
  }
  
  return (
    <Fragment>
      <Card className="mb-3">

{/* {
  isPrintVisible &&      <TailorForm printData={printData}/>
}
     */}

        <AddDiscountedPriceModal 
        fncApiCall={fncApiCall}
        data={discountData}  
        isDiscountShow={isDiscountShow} 
        fncShowHideDiscount={fncShowHideDiscount} />

      <ImageGalleryModal  
      imageGalleryShow={ imageGalleryShow} 
      id={id} 
      fncCloseModal={fncCloseModal}/>


      <ConfirmationModal
        isShowConfirmationModal={isShowConfirmationModal}
        fncsetIsShowConfirmationModal={fncsetIsShowConfirmationModal}
        fncOnOKClick={fncOnOKClick}
      />

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
              <button onClick={fncShowModal} type="button" className="btn btn-outline-theme btn-lg">Add Buyers</button>
              </div>
            </div>

           
          </CardHeader>
          <Card>

       
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    {tableHeaderBuyers?.map((data, i) =>
                      <th key={i}>
                        {data}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {buyersData?.map((data) =>
                    <tr>
                      <td class="noBorder"> 
                      <span style={{ marginLeft: "5px" , fontSize:"25px"}} className="fa fa-user-circle" onClick={() => fncViewImageGallery(data)} ></span></td>
                      <td class="noBorder">{data?.first_name}</td>
                      <td class="noBorder">{data?.last_name}</td>
                      <td class="noBorder">{data?.email}</td>
                      <td class="noBorder">{data?.contact_number}</td>
                      <td class="noBorder">{data?.facebook_account}</td>
                      <td class="noBorder">{data?.instagram_account}</td>
                      <td class="noBorder">{fncTimeStampFormatDate(data?.dob)}</td>
                      <td class="noBorder">{fncIndianTimeFormat(data?.date)}</td>
                      <td class="noBorder">{fncTimeStampFormatDate(data?.date_of_delivery)}</td>
                      <td class="noBorder">{data?.is_delivered?
                      <span className="badge bg-success"  style={{padding:"12px"}} >Delivered</span>
                      :<span className="badge bg-primary" style={{cursor:"pointer", padding:"12px"}} onClick={()=>fncOrderDelivered(data)}>Not Delivered</span>}</td>
                      <td class="noBorder">{data?.is_order_completed?
                      <span className="badge bg-info"  style={{padding:"12px"}} >Order Completed</span>
                      :<span className="badge bg-warning" style={{cursor:"pointer", padding:"12px"}} onClick={()=>fncOrderCompleted(data)}>Pending</span>}</td>
                      <td class="noBorder">{data?.enquiry}</td>
                      <td class="noBorder">
                      <Link style={{ marginRight: "15px" }} to={`/printform?id=${data._id}`} className="fa  fa-print"></Link>
                      </td>
                      <td>
                      <span style={{ marginRight: "15px" , fontSize:"22px"}} className="bi  bi-plus" onClick={() => fncDiscountGiven(data)} ></span>
                        <span style={{ marginRight: "15px" }} className="bi  bi-eye" onClick={() => fncEditData(data)} ></span>
                        <span className="bi bi-trash" onClick={()=> fncDeleteBuyer(data._id)} ></span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* <div className="row">
                <div className="col-md-7">
                </div>
                <div className="col-md-5">
                <span>
          Page {" "}
          <strong>
          {page} of {pageLength}
          </strong> 
        </span>
         <button className="btn btn-outline-theme btn-lg" >{"<<"}</button>
        <Link className="btn btn-outline-theme btn-lg" onClick={fncPreviousPage}  to={`/buyers?page=${parseInt(page)-1}&limit=${pageSize}`}>Previous</Link>
        <Link className="btn btn-outline-theme btn-lg" onClick={fncNextPage}  to={`/buyers?page=${parseInt(page)+1}&limit=${pageSize}`}>Next</Link>
       <button className="btn btn-outline-theme btn-lg" >{">>"}</button>
        <select className="btn btn-outline-theme btn-lg" value={pageSize} onChange={(e) =>fncChangePageSize(e)}>
          {
            [10, 25, 50, 100].map(pageSize => (
              <option value={pageSize} key={pageSize}>
                show {pageSize}
              </option>

            ))
          }
        </select>
                </div>
                </div> */}
            </div>
          </Card>
        </CardBody>
      </Card>

      <AddBuyerModal isNew={isNew} fncApiCall={fncApiCall} modalEditData={modalEditData} isShow={isShow} fncResetModalState={fncResetModalState} />

    </Fragment>
  );
}
export default Buyers;
