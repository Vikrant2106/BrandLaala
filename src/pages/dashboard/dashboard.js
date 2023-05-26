import React, { useEffect, useState } from "react";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/css/jsvectormap.min.css";
import {
  Card,
  CardBody,
  CardExpandToggler,
} from "./../../components/card/card.jsx";
import Chart from "react-apexcharts";
import axios from "axios";
import { Link } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap-daterangepicker/daterangepicker.css";



function Dashboard() {

  const [statsData, setStatsData] = useState();

  async function doGetRequest() {
    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}dashboard/aggregation/`
    );
     
    setStatsData(res?.data)
   
  }

 


  useEffect(() => {
    doGetRequest();
  }, []);
  

  

  return (
    <div>
      <div className="row">
        
           {/* //-------------------------------------------- 1 ---------------------------------------------------- */}
        <div className="col-xl-6 col-lg-6">

       
                  <Card className="mb-3">
                    <CardBody>
                    
                      <div className="d-flex fw-bold small mb-3">
                        <span className="flex-grow-1 text-uppercase">
                            Total Visitors Count
                        </span>
                      </div>
                      <div className="row align-items-center mb-2">
                        <div className="col-7">
                          <h3 className="mb-0">{parseInt(statsData?.buyers_count)+parseInt(statsData?.enquiries_count)}</h3>
                        </div>
                        
                      </div>     
                             
                    </CardBody>
                  </Card>
              
        </div>
            {/* //-------------------------------------------- 1 ---------------------------------------------------- */}
            <div className="col-xl-6 col-lg-6">
       
   
             
                  <Card className="mb-3">
                    <CardBody>
                      <Link to="/dashboard/buyers" style={{"textDecoration": "none"}}>
                      <div className="d-flex fw-bold small mb-3">
                        <span className="flex-grow-1 text-uppercase">
                            Total Buyers Count
                        </span>
                      </div>
                      <div className="row align-items-center mb-2">
                        <div className="col-7">
                          <h3 className="mb-0">{statsData?.buyers_count}</h3>
                        </div>
                        
                      </div>   
                      </Link>              
                    </CardBody>
                  </Card>
          
         
       
        </div>
            {/* //-------------------------------------------- 1 ---------------------------------------------------- */}
            <div className="col-xl-6 col-lg-6">
        
       
   
              
                  <Card className="mb-3">
                    <CardBody>
                      <Link to="/dashboard/inquiry" style={{"textDecoration": "none"}}>
                      <div className="d-flex fw-bold small mb-3">
                        <span className="flex-grow-1 text-uppercase">
                            Total Enquiries Count
                        </span>
                      </div>
                      <div className="row align-items-center mb-2">
                        <div className="col-7">
                          <h3 className="mb-0">{statsData?.enquiries_count}</h3>
                        </div>
                       
                      </div>  
                      </Link>               
                    </CardBody>
                  </Card>
         
         
     
        </div>
         
      </div>
    </div>
  );
}

export default Dashboard;
