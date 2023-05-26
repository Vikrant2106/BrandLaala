import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";



function TailorForm({printData}) {
    const [printableData, setPrintableData] = useState(null);
    const search = useLocation().search;
  useEffect(() => {

    fncGetBuyersById()
 
  }, [printData])

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
  
  async function fncGetBuyersById() {
        let id= new URLSearchParams(search).get('id')
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}buyer/${id}`
        );
        setPrintableData(res?.data?.data?.orders[0]?.items)
}


  return (
    <Fragment>
     
     <div className="container">
             <div className="row mt-4 mb-4">
              <div className="col-md-6">
                <ul style={{listStyle:"none",paddingLeft:"0"}}>
                  <li>Name : {printData?.first_name + " "+ printData?.last_name }</li>
                  <li>Email  : {printData?.email}</li>
                  <li>Contact No: {printData?.contact_number}</li>
                  <li>Order Date : {fncIndianTimeFormat(printData?.date)}</li>
                  <li>Delivery Date : {fncTimeStampFormatDate(printData?.date_of_delivery)}</li>
                </ul>
              </div>
              <div className="col-md-6">
              <img src="https://img.freepik.com/free-photo/digital-painting-mountain-with-colorful-tree-foreground_1340-25699.jpg?w=2000&t=st=1685011032~exp=1685011632~hmac=4bc5f238f6763cdf7224fd99eab1ce77ddc83668be6640732f12142e7a4f6684" width="400px" height="200px"/>
             </div>
             </div>

         
                {printableData?.map((d, i)=>
               
                        <div className="row mt-4 mb-4" >
                             <div className="col-md-12" style={{fontSize:"28px",margin:"30px 0"}}>{d?.garment_type} </div>
                             <div className="row">
                             <div className="col-md-4"> {Object.keys(d)[2]} : {d?.Jwahar_Length}</div>
                             <div className="col-md-4"> {Object.keys(d)[3]} : {d?.Jacket_Length}</div>
                             <div className="col-md-4"> {Object.keys(d)[4]} : {d?.Pant_Length}</div>
                             <div className="col-md-4"> {Object.keys(d)[5]} : {d?.Coat_Length}</div>
                             <div className="col-md-4"> {Object.keys(d)[6]} : {d?.Kurta_Length}</div>
                             <div className="col-md-4"> {Object.keys(d)[7]} : {d?.Shirt_Length}</div>
                             <div className="col-md-4"> {Object.keys(d)[10]} : {d?.Sherwani_Length}</div>
                             <div className="col-md-4"> {Object.keys(d)[11]} : {d?.Indo_Length}</div>
                             <div className="col-md-4"> {Object.keys(d)[12]} : {d?.Safari_Length}</div>
                             <div className="col-md-4"> {Object.keys(d)[19]} : {d?.Chest}</div>
                             <div className="col-md-4"> {Object.keys(d)[20]} : {d?.Pet}</div>
                             <div className="col-md-4"> {Object.keys(d)[21]} : {d?.Shoulders}</div>
                             <div className="col-md-4"> {Object.keys(d)[22]} : {d?.Baju}</div>
                             <div className="col-md-4"> {Object.keys(d)[23]} : {d?.Dola}</div>
                             <div className="col-md-4"> {Object.keys(d)[23]} : {d?.Half_Back}</div>
                             <div className="col-md-4"> {Object.keys(d)[23]} : {d?.Neck}</div>
                             <div className="col-md-4"> {Object.keys(d)[8]} : {d?.Aasan}</div>
                             <div className="col-md-4"> {Object.keys(d)[9]} : {d?.Full_Aasan}</div>
                             <div className="col-md-4"> {Object.keys(d)[13]} : {d?.Weast}</div>
                             <div className="col-md-4"> {Object.keys(d)[14]} : {d?.Hip}</div>
                             <div className="col-md-4"> {Object.keys(d)[15]} : {d?.Thai}</div>
                             <div className="col-md-4"> {Object.keys(d)[16]} : {d?.Pindli}</div>
                             <div className="col-md-4"> {Object.keys(d)[17]} : {d?.Knee}</div>
                             <div className="col-md-4"> {Object.keys(d)[18]} : {d?.Mori}</div>
                            
                          </div>   
                            
                            
              </div>
                )}
           
           <div className="mt-5 d-flex align-items-center justify-content-between">
            <div>
            <img src="https://img.freepik.com/free-photo/digital-painting-mountain-with-colorful-tree-foreground_1340-25699.jpg?w=2000&t=st=1685011032~exp=1685011632~hmac=4bc5f238f6763cdf7224fd99eab1ce77ddc83668be6640732f12142e7a4f6684" width="100px" height="100px"/>
          
            </div>
            <div>
<p>Name: Mukesh</p>
<p>Email:demo@gmail.com</p>
<p>Address : ExpandmyBusiness</p>
            </div>
           </div>
            </div>

    </Fragment>
  );
}
export default TailorForm;
