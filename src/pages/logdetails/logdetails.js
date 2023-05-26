import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React, { useEffect, useState } from "react";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/css/jsvectormap.min.css";
import {
  Card,
  CardBody,
  CardExpandToggler,
  CardHeader,
} from "./../../components/card/card.jsx";
import Chart from "react-apexcharts";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const tableHeaderTCP = [
  "Pid",
  "Family",
  "LocalAddr IP",
  "LocalAddr Port",
  "Process Name",
  "Protocol",
  "Remote Address IP",
  "Remote Address Port",
  "Type",
  "UID",
  "Status",
];

const tableHeaderUDP = [
  "Pid",
  "Family",
  "LocalAddr IP",
  "LocalAddr Port",
  "Process Name",
  "Protocol",
  "Remote Address IP",
  "Remote Address Port",
  "Type",
  "UID",
  "Status",
];

function LogDetails() {
  const { agentID, id } = useParams();
  const [seriesDataPort, setSeriesPort] = useState([]);
  const [ipAddressDataPort, setIpAddressDataPort] = useState([]);
  const [seriesDataTCP, setSeriesTCP] = useState([]);
  const [seriesDatUDP, setSeriesUDP] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [pieVisiblePORT, setPieVisiblePORT] = useState(false);
  const [pieVisibleTCP, setPieVisibleTCP] = useState(false);
  const [pieVisibleUPD, setPieVisibleUDP] = useState(false);
  const [pieVisibleDiskInfo, setPieVisibleDiskInfo] = useState(false);
  const [pieVisibleMemoryInfo, setPieVisibleMemoryInfo] = useState(false);
  const [ipAddresPie, setIpAddressPie] = useState(false);

  
  const [pieVisibleNetworkInfoInBytes, setPieVisibleNetworkInfoInBytes] =
    useState(false);
  const [pieVisibleNetworkInfoInPackets, setPieVisibleNetworkInfoInPackets] =
    useState(false);

  const [show, setShow] = useState(false);

  const themeColor = getComputedStyle(document.body)
    .getPropertyValue("--bs-theme")
    .trim();
  const themeColorRgb = getComputedStyle(document.body)
    .getPropertyValue("--bs-theme-rgb")
    .trim();

  //socket work and apis call
  const [allData, setAllData] = useState();
  const [agentMetadata, setAgentMetadata] = useState();
  const [agentPortdata, setAgentPortdata] = useState();
  const [agentProcessdataTCP, setAgentProcessdataTCP] = useState();
  const [agentProcessdataUDP, setAgentProcessdataUPD] = useState();
  const [ipAddressData, setIPAddressData] = useState([]);

  //date selection
  const [dateWisePortData, setDateWisePortData] = useState();
  const [hostIp, setHostIp] = useState();
  const [startDate, setStartDate] = useState(new Date());
  async function doGetRequest() {
    
    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}agent_detail_data/${id}`
    );
    setAllData(res?.data?.data?.agent_metadata_detail);
    setAgentMetadata(
      res?.data?.data?.agent_metadata_detail.cpuInfo[0] == null
        ? undefined
        : res?.data?.data?.agent_metadata_detail.cpuInfo[0]
    );

    setAgentProcessdataTCP(
      res?.data?.data?.agent_process_data?.TCPStats == null
        ? undefined
        : res?.data?.data?.agent_process_data?.TCPStats
    );
    setAgentProcessdataUPD(
      res?.data?.data?.agent_process_data?.UDPStats == null
        ? undefined
        : res?.data?.data?.agent_process_data?.UDPStats
    );
    setHostIp(res?.data?.data?.agent_ports_data?.hostIP);
    // setAgentPortdata(
    //   res?.data?.data?.agent_ports_data?.sys_ports[0]?.ports == null
    //     ? undefined
    //     : res?.data?.data?.agent_ports_data?.sys_ports[0]?.ports
    // );
  }


  async function getIpAddressRequest(ip) {

    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}get_ip_analytical_data/${ip}`
    );

 
    setIpAddressDataPort([res?.data?.data?.details?.last_analysis_stats?.harmless,
      res?.data?.data?.details?.last_analysis_stats?.malicious,
      res?.data?.data?.details?.last_analysis_stats?.suspicious,
      res?.data?.data?.details?.last_analysis_stats?.timeout,
      res?.data?.data?.details?.last_analysis_stats?.undetected,
    ])
    setIPAddressData(res?.data?.data);
    setIpAddressPie(true)  
   
  }


  async function fncShowWorldMapModel(e) {
 let res =   await getIpAddressRequest(e.target.id)
  setShow(true);
  }

  useEffect(() => {
    doGetRequest();
  }, []);

  useEffect(() => {
    setSeriesPort([]);
    setSeriesUDP([]);
    setSeriesTCP([]);
    setPieVisiblePORT(false);
    setPieVisibleTCP(false);
    setPieVisibleUDP(false);
    setPieVisibleDiskInfo(false);
    setPieVisibleMemoryInfo(false);
    setPieVisibleNetworkInfoInBytes(false);
    setPieVisibleNetworkInfoInPackets(false);
    setPieVisibleNetworkInfoInPackets(true);

    if (agentProcessdataTCP) {
      setSeriesTCP(getState(agentProcessdataTCP));
      setPieVisibleTCP(true);
    }
    if (agentProcessdataUDP) {
      setSeriesUDP(getState(agentProcessdataUDP));
      setPieVisibleUDP(true);
    }
    if (agentPortdata) {
      setSeriesPort(getPorts(agentPortdata));
      setPieVisiblePORT(true);
    }
    if (allData?.diskInfo) {
      setPieVisibleDiskInfo(true);
    }
    if (allData?.memoryInfo) {
      setPieVisibleMemoryInfo(true);
    }
    if (allData?.networkInfo[0]) {
      setPieVisibleNetworkInfoInBytes(true);
      setPieVisibleDiskInfo(true);
    }
  }, [
    pieVisibleNetworkInfoInPackets,
    pieVisibleNetworkInfoInBytes,
    agentMetadata,
    agentPortdata,
    agentProcessdataTCP,
    agentProcessdataUDP,
    pieVisibleDiskInfo,
    pieVisibleMemoryInfo,
    allData,
  ]);



 

  // function for getting process chat data
  const getState = (processData) => {
    let states = {
      LISTEN: 0,
      ESTABLISHED: 0,
      CLOSE: 0,
      TIME_WAIT: 0,
    };
    processData.map((data) => {
      if (data.State === "LISTEN") {
        states.LISTEN = states.LISTEN + 1;
      } else if (data.State === "ESTABLISHED") {
        states.ESTABLISHED = states.ESTABLISHED + 1;
      } else if (data.State === "CLOSE") {
        states.CLOSE = states.CLOSE + 1;
      } else if (data.State === "TIME_WAIT") {
        states.TIME_WAIT = states.TIME_WAIT + 1;
      }
    });
    return Object.values(states);
  };
  const getPorts = (portsData) => {
    let portsState = {
      OPEN: 0,
      CLOSE: 0,
      FILTERED: 0,
    };
    portsData.map((port) => {
      if (port.state.state === "open") {
        portsState.OPEN = portsState.OPEN + 1;
      } else if (port.state.state === "close") {
        portsState.CLOSE = portsState.CLOSE + 1;
      } else if (port.state.state === "filtered") {
        portsState.FILTERED = portsState.FILTERED + 1;
      }
    });
    return Object.values(portsState);
  };

  function dateFormatter(d) {
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  
    return `${ye}-${mo}-${da}`;
  }
 

  async function getPortData(e) {
 
    setStartDate(e);
    let portRes = await axios.get(
      `${process.env.REACT_APP_API_URL}agent_ports/${hostIp}?date=${dateFormatter(e)}`
    );

    console.log("portsData",portRes?.data?.data?.agent_ports_data);
    // setAgentPortdata(
    //   portRes?.data?.data?.agent_ports_data?.sys_ports[0]?.ports === null
    //     ? undefined
    //     : portRes?.data?.data?.agent_ports_data?.sys_ports[0]?.ports
    // );

        setAgentPortdata(
          portRes?.data?.data?.agent_ports_data?.sys_ports[0]?.ports == null
        ? undefined
        : portRes?.data?.data?.agent_ports_data?.sys_ports[0]?.ports
    );
    
  }

  

  let pieOptionsProcessNetworkInfoInPackets = {
    chart: {
      width: 300,
      type: "donut",
      foreColor: "#dddddd",
    },
    labels: ["Packets Received", "Packets Sent", "Drop In", "Drop Out"],
    colors: ["#8BF965", "#E83A0F", "#1CDBD5", "#0A0000"],
    fill: {
      colors: ["#8BF965", "#E83A0F", "#1CDBD5", "#0A0000"],
    },
    stroke: { show: false },
    tooltip: {
      x: { show: false },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: "bottom",
            verticalAlign: "center",
          },
        },
      },
    ],
  };
  let pieOptionsProcessNetworkInfoInBytes = {
    chart: {
      width: 300,
      type: "donut",
      foreColor: "#dddddd",
    },
    labels: ["Bytes Received", "Bytes Sent", "Drop In", "Drop Out"],
    colors: ["#8BF965", "#E83A0F", "#1CDBD5", "#0A0000"],
    fill: {
      colors: ["#8BF965", "#E83A0F", "#1CDBD5", "#0A0000"],
    },
    stroke: { show: false },
    tooltip: {
      x: { show: false },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: "bottom",
            verticalAlign: "center",
          },
        },
      },
    ],
  };
  let pieOptionsProcessMemoryInfo = {
    chart: {
      width: 300,
      type: "donut",
      foreColor: "#dddddd",
    },
    labels: ["FREE", "USED"],
    colors: ["#8BF965", "#E83A0F"],
    fill: {
      colors: ["#8BF965", "#E83A0F"],
    },
    stroke: { show: false },
    tooltip: {
      x: { show: false },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: "bottom",
            verticalAlign: "center",
          },
        },
      },
    ],
  };
  let pieOptionsProcessDiskInfo = {
    chart: {
      width: 300,
      type: "donut",
      foreColor: "#dddddd",
    },
    labels: ["FREE", "USED"],
    colors: ["#8BF965", "#E83A0F"],
    fill: {
      colors: ["#8BF965", "#E83A0F"],
    },
    stroke: { show: false },
    tooltip: {
      x: { show: false },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: "bottom",
            verticalAlign: "center",
          },
        },
      },
    ],
  };
  let pieOptionsPort = {
    chart: {
      width: 300,
      type: "donut",
      foreColor: "#dddddd",
    },
    labels: ["OPEN", "CLOSE", "FILTERED"],
    colors: ["#8BF965", "#E83A0F", "#1CDBD5"],
    fill: {
      colors: ["#8BF965", "#E83A0F", "#1CDBD5"],
    },
    stroke: { show: false },
    tooltip: {
      x: { show: false },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: "bottom",
            verticalAlign: "center",
          },
        },
      },
    ],
  };

  let ipAddressOptionsPort = {
    chart: {
      width: 300,
      type: "donut",
      foreColor: "#dddddd",
    },
    labels: ["HARMLESS", "MALICIOUS", "SUSPECIOUS","TIMEOUT","UNDETECTED"],
    colors: ["#8BF965", "#E83A0F", "#1CDBD5","#568DEF","#DB56EE"],
    fill: {
      colors: ["#8BF965", "#E83A0F", "#1CDBD5","#568DEF","#DB56EE"],
    },
    stroke: { show: false },
    tooltip: {
      x: { show: false },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: "bottom",
            verticalAlign: "center",
          },
        },
      },
    ],
  };
  let newStr;

  useEffect(()=>{
    getPortData(startDate);
  },[hostIp])

  return (
    <>
      {agentMetadata && (
        <CardBody>
          <CardHeader className="mb-3 mt-3">Agent Meta - {id}</CardHeader>
          <Card>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">Family</th>
                    <th scope="col">Model</th>
                    <th scope="col">Stepping</th>
                    <th scope="col">Physical Id</th>
                    <th scope="col">Core Id</th>
                    <th scope="col">Cores</th>
                    <th scope="col">Model Name</th>
                    <th scope="col">MHZ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="noBorder">{agentMetadata.vendorId}</td>
                    <td class="noBorder">{agentMetadata.family}</td>
                    <td class="noBorder">{agentMetadata.model}</td>
                    <td class="noBorder">{agentMetadata.stepping}</td>
                    <td class="noBorder">
                      {agentMetadata.physicalId !== ""
                        ? agentMetadata.physicalId
                        : "-"}
                    </td>
                    <td class="noBorder">{agentMetadata.coreId}</td>
                    <td class="noBorder">{agentMetadata.cores}</td>
                    <td class="noBorder">{agentMetadata.modelName}</td>
                    <td class="noBorder">{agentMetadata.mhz}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </CardBody>
      )}
      <div className="row mt-5">
        <div className="col-xl-6 col-lg-6">
          <Card className="mb-3">
            <CardHeader className="mb-3 mt-3">Disk Info- {id}</CardHeader>
            {pieVisibleDiskInfo ? (
              <>
                <span>Total Space : {allData?.diskInfo?.total}</span>
                <Chart
                  type="donut"
                  options={pieOptionsProcessDiskInfo}
                  series={[allData?.diskInfo?.free, allData?.diskInfo?.used]}
                  style={{ height: "386px", width: "450px", marginTop: "60px" }}
                />
              </>
            ) : (
              <> No data avilable </>
            )}
          </Card>
        </div>

        <div className="col-xl-6 col-lg-6">
          <Card className="mb-3">
            <CardHeader className="mb-3 mt-3">Memory Info - {id}</CardHeader>
            {pieVisibleMemoryInfo ? (
              <>
                <span>Total Space : {allData?.memoryInfo?.total}</span>

                <Chart
                  type="donut"
                  options={pieOptionsProcessMemoryInfo}
                  series={[
                    allData?.memoryInfo?.free,
                    allData?.memoryInfo?.used,
                  ]}
                  style={{ height: "386px", width: "450px", marginTop: "60px" }}
                />
              </>
            ) : (
              <> No data avilable </>
            )}
          </Card>
        </div>

        <div className="col-xl-6 col-lg-6">
          <Card className="mb-3">
            <CardHeader className="mb-3 mt-3">
              Network Info (Bytes) - {id}
            </CardHeader>
            {pieVisibleNetworkInfoInBytes ? (
              <Chart
                type="donut"
                options={pieOptionsProcessNetworkInfoInBytes}
                series={[
                  allData?.networkInfo[0]?.bytesRecv,
                  allData?.networkInfo[0]?.bytesSent,
                  allData?.networkInfo[0]?.dropin,
                  allData?.networkInfo[0]?.dropout,
                ]}
                style={{ height: "386px", width: "450px", marginTop: "60px" }}
              />
            ) : (
              <> No data avilable </>
            )}
          </Card>
        </div>

        <div className="col-xl-6 col-lg-6">
          <Card className="mb-3">
            <CardHeader className="mb-3 mt-3">
              Network Info (Packets) - {id}
            </CardHeader>
            {pieVisibleNetworkInfoInPackets ? (
              <Chart
                type="donut"
                options={pieOptionsProcessNetworkInfoInPackets}
                series={[
                  allData?.networkInfo[0]?.packetsRecv,
                  allData?.networkInfo[0]?.packetsSent,
                  allData?.networkInfo[0]?.dropin,
                  allData?.networkInfo[0]?.dropout,
                ]}
                style={{ height: "386px", width: "450px", marginTop: "60px" }}
              />
            ) : (
              <> No data avilable </>
            )}
          </Card>
        </div>
      </div>
      
        <CardBody className="mb-3 mt-5">
          <CardHeader className="mb-3 mt-3">
        <div className="row">
          <div className="col-xl-6">
          Agent Port Details - {id}
          </div>
          <div className="col-xl-6" style={{textAlign:"right"}}>

          <Card style={{width:"40%"}} className="mb-3 custom-datepicker">
              <DatePicker
              selected={startDate}
              onSelect={getPortData}
              >
              </DatePicker>
            </Card>
</div>

        </div>
           
          </CardHeader>
      
          <Tabs
            defaultActiveKey="table"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab 
              style={{
              zIndex:0,
              position:'relative'
            }}
              eventKey="table" 
              title="Table">
              <Card>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Port</th>
                        <th scope="col">Name</th>
                        <th scope="col">OS Type</th>
                        <th scope="col">Reason</th>
                        <th scope="col">State</th>
                      </tr>
                    </thead>
                    <tbody>
                      { agentPortdata ? agentPortdata.map((port, idx) => {
                        return (
                          <tr>
                            <td class="noBorder">{port.id}</td>
                            <td class="noBorder">{port.service.name}</td>
                            <td class="noBorder">{port.service.os_type}</td>
                            <td class="noBorder">{port.state.reason}</td>
                            <td class="noBorder">{port.state.state}</td>
                          </tr>
                        );
                      }) :    <> No data available </>}
                    </tbody>
                  </table>
                </div>
              </Card>
            </Tab>
            <Tab eventKey="chart" title="Chart">
              <div>
                <Card className="mb-3">
                  {pieVisiblePORT ? (
                    <Chart
                      type="donut"
                      options={pieOptionsPort}
                      series={seriesDataPort}
                      style={{
                        height: "386px",
                        width: "450px",
                        marginTop: "60px",
                      }}
                    />
                  ) : (
                    <> No data available </>
                  )}
                </Card>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
    

      {agentProcessdataTCP && (
        <div className="row mt-5">
         
          <div className="col-xl-12 col-lg-12">
            <Card className="mb-3">
              <CardHeader className="mb-3 mt-3">
                Agent TCP Stats Table - {id}
              </CardHeader>
              <div
                style={{
                  maxHeight: "450px",
                  overflow: "scroll",
                  padding: "30px",
                }}
              >
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      {tableHeaderTCP?.map((d, index) => (
                        <th key={index}>{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {agentProcessdataTCP?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          {data?.pid}
                        </td>
                        <td id={data?.Ip}>{data?.family}</td>
                        <td>{data?.localaddr?.ip}</td>
                        <td>{data?.localaddr?.port}</td>
                        <td>{data?.processname}</td>
                        <td>{data?.protocol}</td>
                        <td  
                        id={data?.remoteaddr?.ip}
                        style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={fncShowWorldMapModel}>{data?.remoteaddr?.ip}</td>
                        <td>{data?.remoteaddr?.port}</td>
                        <td>{data?.type}</td>
                        <td>{data?.uids}</td>
                        <td>{data?.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      )}
      {agentProcessdataUDP && (
        <div className="row mt-5">
          <div className="col-xl-12 col-lg-12">
            <Card className="mb-3">
              <CardHeader className="mb-3 mt-3">
                Agent UDP Stats Table - {id}
              </CardHeader>
              <div
                style={{
                  maxHeight: "450px",
                  overflow: "scroll",
                  padding: "30px",
                }}
              >
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      {tableHeaderUDP?.map((d, index) => (
                        <th key={index}>{d}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {agentProcessdataUDP?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          {data?.pid}
                        </td>
                        <td
                          id={data?.Ip}
                        >
                          {data?.family}
                        </td>
                        <td>{data?.localaddr?.ip}</td>
                        <td>{data?.localaddr?.port}</td>
                        <td>{data?.processname}</td>
                        <td>{data?.protocol}</td>
                        <td 
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={fncShowWorldMapModel}
                        >{data?.remoteaddr?.ip}</td>
                        <td >{data?.remoteaddr?.port}</td>
                        <td>{data?.type}</td>
                        <td>{data?.uids}</td>
                        <td>{data?.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      )}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        fullscreen={true}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            IP Tracking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-xl-6">
            {ipAddresPie ? (
                    <Chart
                      type="donut"
                      options={ipAddressOptionsPort}
                      series={ipAddressDataPort}
                      style={{ height: "386px", width: "450px", marginTop: "60px" }}
                    />
                  ) : (
                    <> No data avilable </>
                  )}
            </div>
            <div className="col-xl-6">
              <Card>
                <div className="mb-3 m-3">
                  Data Safety Ratio
                  </div>     
               <div>
                <ui>
                  <ul>HARMLESS : {ipAddressData?.details?.last_analysis_stats?.harmless}</ul>
                  <ul>MALICIOUS : {ipAddressData?.details?.last_analysis_stats?.malicious}</ul>
                  <ul>SUSPECIOUS : {ipAddressData?.details?.last_analysis_stats?.suspicious}</ul>
                  <ul>TIMEOUT : {ipAddressData?.details?.last_analysis_stats?.timeout}</ul>
                  <ul>UNDETECTED : {ipAddressData?.details?.last_analysis_stats?.undetected}</ul>
                </ui>
               </div>
               </Card>
            </div>
          </div>
       



          <Tabs
            defaultActiveKey="table"
            id="uncontrolled-tab-example"
            className="mb-3"
          >


            <Tab eventKey="table" title="Detection">
              <Card>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                      <th scope="col">Vendor Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Engine Name</th>
                        <th scope="col">Method</th>
                        <th scope="col">Result</th>


                      </tr>
                    </thead>
                    <tbody>
                      {ipAddressData?.detection?.map((port, idx) => {
                        return (
                          <tr>
                            <td class="noBorder">{port.vendor_name}</td>
                            <td class="noBorder">{port.category}</td>
                            <td class="noBorder">{port.engine_name}</td>
                            <td class="noBorder">{port.method}</td>
                            <td class="noBorder">
                              {port?.result=="clean"?
                               <span>  
                                <img alt="" height="30px" className="mw-100 mh-100" src="/assets/img/RightTick.webp" />
                            
                                {port.result}
                                </span>
                          :
                          <span>
                             <img alt="" height="30px" className="mw-100 mh-100" src="/assets/img/WrongTick.png" />
                            {port.result}
                          </span>
                           
                            }
                         
                              
                              </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </Tab>
            <Tab eventKey="chart" title="Details">
              <div>
                {/* <Card className="mb-3"> */}


            <div className="row">
            <div className="col-xk-12">
              <div> Autonomous System Label : {ipAddressData?.details?.autonomous_system_label}</div>
              <div> Autonomous System Number : {ipAddressData?.details?.autonomous_system_number}</div>
              <div> Continent : {ipAddressData?.details?.continent}</div>
              <div> Country: {ipAddressData?.details?.country}</div>
              <div> Network: {ipAddressData?.details?.network}</div>
              <div> Reginoal Internet Registry: {ipAddressData?.details?.regional_internet_registry}</div>
              <div> Whois : {ipAddressData?.details?.whois}</div>
           
            </div>
            </div>
                
                {/* </Card> */}
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LogDetails;
