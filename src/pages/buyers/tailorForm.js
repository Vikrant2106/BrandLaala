import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { companyAddress, companyEmail, companyMobile, companyName } from "../../components/utils/constant";



function TailorForm({ printData }) {
    const [printableData, setPrintableData] = useState(null);
    const [upperData, setUpperData] = useState(null);
    const search = useLocation().search;
    useEffect(() => {

        fncGetBuyersById()

    }, [printData])

    function fncTimeStampFormatDate(dod) {
        return dod?.split("T")[0].split("-")[2] + "-" +
            dod?.split("T")[0].split("-")[1] + "-" +
            dod?.split("T")[0].split("-")[0]
    }

    function fncIndianTimeFormat(dod) {
        return dod?.split("-")[2] + "-" +
            dod?.split("-")[1] + "-" +
            dod?.split("-")[0]
    }

    async function fncGetBuyersById() {
        let id = new URLSearchParams(search).get('id')
        let res = await axios.get(
            `${process.env.REACT_APP_API_URL}buyer/${id}`
        );
        setUpperData(res?.data?.data)
        setPrintableData(res?.data?.data?.orders[0]?.items)
    }


    return (
        <Fragment>

            <div className="container" id="print-content" style={{borderColor:"1px solid white"}}>
                <div className="flex-container">
                    <div className=" ">
                        <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                            <li>Name : {upperData?.first_name + " " + upperData?.last_name}</li>
                            <li>Email  : {upperData?.email}</li>
                            <li>Contact No: {upperData?.contact_number}</li>
                            <li>Order Date : {fncIndianTimeFormat(upperData?.date)}</li>
                            <li>Delivery Date : {fncTimeStampFormatDate(upperData?.date_of_delivery)}</li>
                        </ul>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <img src="/assets/img/brand.jpeg" width="100px" height="100px" />
                    </div>
                </div>

                {printableData?.map((d, i) =>
                    <div className="mt-4 mb-5" >
                        <div className="" style={{ fontSize: "28px", margin: "30px 0" }}>{d?.garment_type} </div>
                      
                     <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
                            <div className="item"> {Object.keys(d)[2]} : {d?.Jwahar_Length}</div>
                            <div className="item"> {Object.keys(d)[3]} : {d?.Jacket_Length}</div>
                            <div className="item"> {Object.keys(d)[4]} : {d?.Pant_Length}</div>
                            <div className="item"> {Object.keys(d)[5]} : {d?.Coat_Length}</div>
                            <div className="item"> {Object.keys(d)[6]} : {d?.Kurta_Length}</div>
                            <div className="item"> {Object.keys(d)[7]} : {d?.Shirt_Length}</div>
                            <div className="item"> {Object.keys(d)[10]} : {d?.Sherwani_Length}</div>
                            <div className="item"> {Object.keys(d)[11]} : {d?.Indo_Length}</div>
                            <div className="item"> {Object.keys(d)[12]} : {d?.Safari_Length}</div>
                            <div className="item"> {Object.keys(d)[19]} : {d?.Chest}</div>
                            <div className="item"> {Object.keys(d)[20]} : {d?.Pet}</div>
                            <div className="item"> {Object.keys(d)[21]} : {d?.Shoulders}</div>
                            <div className="item"> {Object.keys(d)[22]} : {d?.Baju}</div>
                            <div className="item"> {Object.keys(d)[23]} : {d?.Dola}</div>
                            <div className="item"> {Object.keys(d)[23]} : {d?.Half_Back}</div>
                            <div className="item"> {Object.keys(d)[23]} : {d?.Neck}</div>
                            <div className="item"> {Object.keys(d)[8]} : {d?.Aasan}</div>
                            <div className="item"> {Object.keys(d)[9]} : {d?.Full_Aasan}</div>
                            <div className="item"> {Object.keys(d)[13]} : {d?.Weast}</div>
                            <div className="item"> {Object.keys(d)[14]} : {d?.Hip}</div>
                            <div className="item"> {Object.keys(d)[15]} : {d?.Thai}</div>
                            <div className="item"> {Object.keys(d)[16]} : {d?.Pindli}</div>
                            <div className="item"> {Object.keys(d)[17]} : {d?.Knee}</div>
                            <div className="item"> {Object.keys(d)[18]} : {d?.Mori}</div>
                     
                    </div>
                    </div>
                )}
                <div className="mt-5 pt-5 d-flex align-items-center justify-content-between">
                    <div>
                        <img src="/assets/img/brand.jpeg" width="100px" height="100px" />
                    </div>
                    <div>
                       

                        <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                           <li>{companyName}</li>
                           <li>{companyMobile}</li>
                           <li>{companyEmail}</li>
                           <li style={{maxWidth:"250px"}}>{companyAddress}</li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="row mt-4">
                <div className="col-md-12" style={{textAlign:"right"}}>
                    <Link to="/dashboard/buyers" className="btn btn-outline-theme btn-lg" style={{marginRight:"10px"}}> Cancel </Link>
                    <button  className="btn btn-outline-theme btn-lg" onClick={()=> window.print()} >Print</button>
                </div>
            </div>


        </Fragment>
    );
}
export default TailorForm;
