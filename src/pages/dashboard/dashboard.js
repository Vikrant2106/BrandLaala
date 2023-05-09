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
import { socket } from "../../socket/SocketConnection.js";
import { Link } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap-daterangepicker/daterangepicker.css";

const tableHeader = [
  "Physical Id",
  "Model Name",
  "Vendor Id",
  "OS",
  "Platform",
  "Host IP",
  "Status",
];

var date = new Date();

function dateFormatter(d) {
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${ye}-${mo}-${da}`;
}
function Dashboard() {
  const [lastSeventActiveLabels, setLastSeventActiveLabels] = useState([]);
  const [lastSeventActiveLabelsValue, selastSeventActiveLabelsValue] = useState(
    []
  );
  const [labelsData, setLabels] = useState([
    "Active",
    "Disconnected",
    "Never Connected",
    "Pending",
  ]);
  const [seriesData, setSeries] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [singleBar, setSingleBar] = useState([]);
  const [ddlSelectedOption, setDdlSelectedOption] = useState("ALL");

  const themeColor = getComputedStyle(document.body)
    .getPropertyValue("--bs-theme")
    .trim();
  const themeColorRgb = getComputedStyle(document.body)
    .getPropertyValue("--bs-theme-rgb")
    .trim();

  function randomNo() {
    return Math.floor(Math.random() * 60) + 30;
  }

  // server chart
  var serverChartData = [
    { name: "MEMORY USAGE", data: 2 },
    { name: "CPU USAGE", data: 4 },
  ];

  const [statsData, setStatsData] = useState();
  const [serverData, setServerData] = useState();
  const [countryData, setCountryData] = useState();
  const [sourceData, setSourceData] = useState();
  const [sourceChartData, setSourceChartData] = useState();
  const [productData, setProductData] = useState();
  const [activityLogData, setActivityLogData] = useState();
  const [chartOptions, setChartOptions] = useState(getChartOptions());
  const [serverChartOptions, setServerChartOptions] = useState(
    getServerChartOptions()
  );
  const navigateData = [
    "active",
    "all",
    "disconnect",
    "pending",
    "never_connected",
  ];
  const [ddlOptions, setDDLOptions] = useState([
    {
      label: "ALL",
      isSelected: true,
      value: "all",
    },

    {
      label: "ACTIVE",
      isSelected: false,
      value: "active",
    },
    {
      label: "DISCONNECT",
      isSelected: false,
      value: "disconnect",
    },
    {
      label: "PENDING",
      isSelected: false,
      value: "pending",
    },
    {
      label: "NEVER CONNECTED",
      isSelected: false,
      value: "never_connected",
    },
  ]);

  function fncDDLSelection(e) {
    let data = ddlOptions;
    var newData = data.map((da) => {
      if (da.value == e.target.id) {
        da.isSelected = true;
      } else {
        da.isSelected = false;
      }
      return da;
    });

    setDDLOptions(newData);
    setDdlSelectedOption(e.target.textContent);
    getStatusWiseDataRequest(e.target.id);
  }

  //socket work and apis call
  const [dashData, setDashData] = useState([]);
  const [dashDataArray, setDashDataArray] = useState([]);
  const [endDatedata, setEndDate] = useState(new Date());
  const [startDatedata, setStartDate] = useState(() => {
    var d = new Date();
    var day = d.getDate() - 7;
    d.setDate(day);
    return d;
  });

  function handleEvent(event, { startDate, endDate }) {
    setStartDate(startDate.format("YYYY-MM-DD"));
    setEndDate(endDate.format("YYYY-MM-DD"));
    getHistoryData(
      startDate.format("YYYY-MM-DD"),
      endDate.format("YYYY-MM-DD")
    );
  }

  async function doGetRequest() {
    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}agents_metadata`
    );
    setDashData(res?.data?.data?.agents_info);
    setAgentData(res?.data?.data?.agents_data);
    let seriesD = [
      res?.data?.data?.agents_info?.total_active_agents,
      res?.data?.data?.agents_info?.total_disconnected_agents,
      res?.data?.data?.agents_info?.total_never_connected_agents,
      res?.data?.data?.agents_info?.total_pending_agents,
    ];
    setSeries(seriesD);
    setDashDataArray(
      Object.entries(res?.data?.data?.agents_info).map(([key, value]) => ({
        key,
        value,
      }))
    );
    getHistoryData();
  }

  async function getStatusWiseDataRequest(status) {
    let res = await axios.get(
      `${process.env.REACT_APP_API_URL}agents_metadata?status=${status}`
    );

    setAgentData(res?.data?.data?.agents_data);
  }

  async function getHistoryData(start, end) {
    setLastSeventActiveLabels([]);
    selastSeventActiveLabelsValue([]);
    let res = await axios.get(
      `${
        process.env.REACT_APP_API_URL
      }aggregate_agent_status_wise_data?status=active&from_date=${
        start == undefined ? dateFormatter(startDatedata) : start
      }&to_date=${end == undefined ? dateFormatter(endDatedata) : end}`
    );
    let labels = [];
    let values = [];
    res?.data?.data.map((d, i) => {
      labels.push(d.date);
      values.push(d.count);
    });
    setLastSeventActiveLabels(labels);
    selastSeventActiveLabelsValue(values);
  }
  useEffect(() => {
    doGetRequest();
  }, []);
  useEffect(() => {
    function onConnect(data) {
      console.log("data", data);
    }

    function onDisconnect(data) {
      console.log("data", data);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("agent_added", doGetRequest);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("agent_added", doGetRequest);
    };
  }, []);

  function getChartOptions() {
    var themeColor = getComputedStyle(document.body)
      .getPropertyValue("--bs-theme")
      .trim();
    var themeColorRgb = getComputedStyle(document.body)
      .getPropertyValue("--bs-theme-rgb")
      .trim();

    return {
      bar: {
        colors: [themeColor],
        chart: { sparkline: { enabled: true } },
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
      },
      line: {
        colors: [themeColor],
        chart: { sparkline: { enabled: true } },
        stroke: { curve: "straight", width: 2 },
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
      },
      pie: {
        colors: [
          "rgba(" + themeColorRgb + ", 1)",
          "rgba(" + themeColorRgb + ", .75)",
          "rgba(" + themeColorRgb + ", .5)",
        ],
        chart: { sparkline: { enabled: true } },
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
      },
      donut: {
        colors: [
          "rgba(" + themeColorRgb + ", .15)",
          "rgba(" + themeColorRgb + ", .35)",
          "rgba(" + themeColorRgb + ", .55)",
          "rgba(" + themeColorRgb + ", .75)",
          "rgba(" + themeColorRgb + ", .95)",
        ],
        chart: { sparkline: { enabled: true } },
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
      },
    };
  }

  function getServerChartOptions() {
    var borderColor = getComputedStyle(document.body)
      .getPropertyValue("--bs-border-color")
      .trim();
    var bodyColor = getComputedStyle(document.body)
      .getPropertyValue("--bs-body-color")
      .trim();
    var inverseRgb = getComputedStyle(document.body)
      .getPropertyValue("--bs-inverse-rgb")
      .trim();
    var themeColor = getComputedStyle(document.body)
      .getPropertyValue("--bs-theme")
      .trim();
    var themeFont = getComputedStyle(document.body)
      .getPropertyValue("--bs-body-font-family")
      .trim();

    return {
      chart: { toolbar: { show: false } },
      plotOptions: {
        bar: { horizontal: false, columnWidth: "55%", endingShape: "rounded" },
      },
      dataLabels: { enabled: false },
      grid: { show: true, borderColor: borderColor },
      stroke: { show: false },
      colors: ["rgba(" + inverseRgb + ", .15)", themeColor],
      legend: { fontFamily: themeFont, labels: { colors: bodyColor } },
      xaxis: {
        categories: ["Jan", "Feb"],
        labels: { show: false },
        axisBorder: {
          show: true,
          color: borderColor,
          height: 1,
          width: "100%",
          offsetX: 0,
          offsetY: -1,
        },
        axisTicks: {
          show: true,
          borderType: "solid",
          color: borderColor,
          height: 6,
          offsetX: 0,
          offsetY: 0,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: bodyColor,
            fontSize: "12px",
            fontFamily: themeFont,
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },
      fill: { opacity: 0.65 },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    };
  }

  function renderMap() {
    var inverse = getComputedStyle(document.body)
      .getPropertyValue("--bs-inverse")
      .trim();
    var themeColor = getComputedStyle(document.body)
      .getPropertyValue("--bs-theme")
      .trim();
    const map = document.getElementById("world-map");
    const mapElm = document.querySelectorAll(".jvm-tooltip");

    if (map) {
      for (let i = 0; i < mapElm.length; i++) {
        mapElm[i].remove();
      }
      map.innerHTML = "";

      new jsVectorMap({
        selector: "#world-map",
        map: "world",
        zoomButtons: true,
        normalizeFunction: "polynomial",
        hoverOpacity: 0.5,
        hoverColor: false,
        zoomOnScroll: false,
        series: { regions: [{ normalizeFunction: "polynomial" }] },
        labels: { markers: { render: (marker) => marker.name } },
        focusOn: { x: 0.5, y: 0.5, scale: 1 },
        markerStyle: {
          initial: { fill: themeColor, stroke: "none", r: 5 },
          hover: { fill: themeColor },
        },
        regionStyle: {
          initial: {
            fill: inverse,
            fillOpacity: 0.35,
            stroke: "none",
            strokeWidth: 0.4,
            strokeOpacity: 1,
          },
          hover: { fillOpacity: 0.5 },
        },
        backgroundColor: "transparent",
      });
    }
  }

  useEffect(() => {
    fetch("/assets/data/dashboard/stats.json")
      .then((res) => res.json())
      .then((result) => {
        setStatsData(result);
      });
    fetch("/assets/data/dashboard/server.json")
      .then((res) => res.json())
      .then((result) => {
        setServerData(result);
      });
    fetch("/assets/data/dashboard/country.json")
      .then((res) => res.json())
      .then((result) => {
        setCountryData(result);
      });
    fetch("/assets/data/dashboard/source.json")
      .then((res) => res.json())
      .then((result) => {
        setSourceData(result);
      });
    fetch("/assets/data/dashboard/source-chart.json")
      .then((res) => res.json())
      .then((result) => {
        setSourceChartData(result);
      });
    fetch("/assets/data/dashboard/product.json")
      .then((res) => res.json())
      .then((result) => {
        setProductData(result);
      });
    fetch("/assets/data/dashboard/activity-log.json")
      .then((res) => res.json())
      .then((result) => {
        setActivityLogData(result);
      });

    renderMap();

    document.addEventListener("theme-reload", () => {
      setServerChartOptions(getServerChartOptions());
      setChartOptions(getChartOptions());
      renderMap();
    });

    // eslint-disable-next-line
  }, []);

  let pieOptions = {
    chart: {
      width: 300,
      type: "donut",
      foreColor: "#dddddd",
    },
    labels: labelsData,
    colors: ["#0FE819", "#E83A0F", "#1CDBD5", "#0A0000"],
    fill: {
      colors: ["#0FE819", "#E83A0F", "#1CDBD5", "#0A0000"],
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
                        <CardExpandToggler />
                      </div>
                      <div className="row align-items-center mb-2">
                        <div className="col-7">
                          <h3 className="mb-0">100</h3>
                        </div>
                        <div className="col-5">
                          <div className="mt-n2">
                            <Chart
                              type={"bar"}
                              height={30}
                              options={chartOptions["bar"]}
                              series={[
                                {
                                  name: "Visitors",
                                  data: [
                                    69, 34, 70, 73, 41, 32, 73, 72, 89, 57, 42,
                                    86, 78,
                                  ],
                                },
                              ]}
                            />
                          </div>
                        </div>
                      </div>                 
                    </CardBody>
                  </Card>
              
        </div>
            {/* //-------------------------------------------- 1 ---------------------------------------------------- */}
            <div className="col-xl-6 col-lg-6">
       
   
             
                  <Card className="mb-3">
                    <CardBody>
                      <div className="d-flex fw-bold small mb-3">
                        <span className="flex-grow-1 text-uppercase">
                            Total Buyers Count
                        </span>
                        <CardExpandToggler />
                      </div>
                      <div className="row align-items-center mb-2">
                        <div className="col-7">
                          <h3 className="mb-0">100</h3>
                        </div>
                        <div className="col-5">
                          <div className="mt-n2">
                            <Chart
                              type={"bar"}
                              height={30}
                              options={chartOptions["bar"]}
                              series={[
                                {
                                  name: "Visitors",
                                  data: [
                                    69, 34, 70, 73, 41, 32, 73, 72, 89, 57, 42,
                                    86, 78,
                                  ],
                                },
                              ]}
                            />
                          </div>
                        </div>
                      </div>                 
                    </CardBody>
                  </Card>
          
         
       
        </div>
            {/* //-------------------------------------------- 1 ---------------------------------------------------- */}
            <div className="col-xl-6 col-lg-6">
        
       
   
              
                  <Card className="mb-3">
                    <CardBody>
                      <div className="d-flex fw-bold small mb-3">
                        <span className="flex-grow-1 text-uppercase">
                            Total Enquiries Count
                        </span>
                        <CardExpandToggler />
                      </div>
                      <div className="row align-items-center mb-2">
                        <div className="col-7">
                          <h3 className="mb-0">100</h3>
                        </div>
                        <div className="col-5">
                          <div className="mt-n2">
                            <Chart
                              type={"bar"}
                              height={30}
                              options={chartOptions["bar"]}
                              series={[
                                {
                                  name: "Visitors",
                                  data: [
                                    69, 34, 70, 73, 41, 32, 73, 72, 89, 57, 42,
                                    86, 78,
                                  ],
                                },
                              ]}
                            />
                          </div>
                        </div>
                      </div>                 
                    </CardBody>
                  </Card>
         
         
     
        </div>
            {/* //-------------------------------------------- 1 ---------------------------------------------------- */}
            <div className="col-xl-6 col-lg-6">
          <div className="row">
       
   
         
                  <Card className="mb-3">
                    <CardBody>
                      <div className="d-flex fw-bold small mb-3">
                        <span className="flex-grow-1 text-uppercase">
                            Total Tailors Count
                        </span>
                        <CardExpandToggler />
                      </div>
                      <div className="row align-items-center mb-2">
                        <div className="col-7">
                          <h3 className="mb-0">100</h3>
                        </div>
                        <div className="col-5">
                          <div className="mt-n2">
                            <Chart
                              type={"bar"}
                              height={30}
                              options={chartOptions["bar"]}
                              series={[
                                {
                                  name: "Visitors",
                                  data: [
                                    69, 34, 70, 73, 41, 32, 73, 72, 89, 57, 42,
                                    86, 78,
                                  ],
                                },
                              ]}
                            />
                          </div>
                        </div>
                      </div>                 
                    </CardBody>
                  </Card>
               
         
          </div>
        </div>
      </div>
 


      <div className="row">
        <div className="col-xl-12">
          <Card className="mb-3">
            <CardBody>
              <Chart
                type="bar"
                height={500}
                series={[
                  {
                    name: "Active Count",
                    data: lastSeventActiveLabelsValue,
                  },
                ]}
                options={{
                  plotOptions: {
                    bar: {
                      columnWidth: "20px",
                    },
                  },
                  chart: {
                    events: {
                      dataPointSelection: async (e, chart, opts) => {
                        const selectedDate = lastSeventActiveLabels.find(
                          (d, i) => {
                            return i === opts.dataPointIndex;
                          }
                        );

                        let res = await axios.get(
                          `${process.env.REACT_APP_API_URL}agents_metadata_status_wise?status=active&date=${selectedDate}`
                        );

                        setSingleBar(res?.data?.data);
                        document.getElementById("modalButton").click();
                      },
                    },
                  },
                  title: {
                    text: "Last 7 days Active Nodes",
                    style: { fontSize: 15 },
                    style: {
                      color: [
                        "rgba(" + themeColorRgb + ", 1)",
                        "rgba(" + themeColorRgb + ", .75)",
                        "rgba(" + themeColorRgb + ", .5)",
                      ],
                      fontSize: 15,
                    },
                  },

                  subtitle: {
                    text: "",
                    style: { fontSize: 18 },
                  },
                  colors: [
                    "rgba(" + themeColorRgb + ", 1)",
                    "rgba(" + themeColorRgb + ", .75)",
                    "rgba(" + themeColorRgb + ", .5)",
                  ],
                  // colors: ["#f90000"],
                  // theme: { mode: "light" },

                  xaxis: {
                    tickPlacement: "on",
                    categories: lastSeventActiveLabels,
                    labels: {
                      show: true,
                      rotate: -45,
                      rotateAlways: false,
                      hideOverlappingLabels: true,
                      showDuplicates: false,
                      trim: false,
                      minHeight: undefined,
                      maxHeight: 120,
                      style: {
                        colors: "rgb(243, 79, 160)",
                        fontSize: "12px",
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontWeight: 400,
                        cssClass: "apexcharts-xaxis-label",
                      },
                      offsetX: 0,
                      offsetY: 0,
                      format: undefined,
                      formatter: undefined,
                      datetimeUTC: true,
                      datetimeFormatter: {
                        year: "yyyy",
                        month: "MMM 'yy",
                        day: "dd MMM",
                        hour: "HH:mm",
                      },
                    },
                    title: {
                      text: "Days of the Month",
                      style: {
                        color: [
                          "rgba(" + themeColorRgb + ", 1)",
                          "rgba(" + themeColorRgb + ", .75)",
                          "rgba(" + themeColorRgb + ", .5)",
                        ],
                        fontSize: 15,
                      },
                    },
                  },

                  yaxis: {
                    labels: {
                      formatter: (val) => {
                        return `${val}`;
                      },
                      style: {
                        fontSize: "15",
                        colors: [
                          "rgba(" + themeColorRgb + ", 1)",
                          "rgba(" + themeColorRgb + ", .75)",
                          "rgba(" + themeColorRgb + ", .5)",
                        ],
                      },
                    },
                    title: {
                      text: "No of Users",
                      style: {
                        color: [
                          "rgba(" + themeColorRgb + ", 1)",
                          "rgba(" + themeColorRgb + ", .75)",
                          "rgba(" + themeColorRgb + ", .5)",
                        ],
                        fontSize: 15,
                      },
                    },
                  },

                  legend: {
                    show: true,
                    position: "right",
                  },

                  dataLabels: {
                    formatter: (val) => {
                      return `${val}`;
                    },
                    style: {
                      colors: [
                        "rgba(" + themeColorRgb + ", 1)",
                        "rgba(" + themeColorRgb + ", .75)",
                        "rgba(" + themeColorRgb + ", .5)",
                      ],
                      fontSize: 10,
                    },
                  },
                }}
              ></Chart>
            </CardBody>
          </Card>
        </div>
      </div>
      <button
        type="button"
        style={{ display: "none" }}
        id="modalButton"
        className="btn btn-outline-theme me-2"
        data-bs-toggle="modal"
        data-bs-target="#modalLg"
      ></button>
      <div className="modal fade" id="modalLg">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div
              style={{
                paddingTop: "5px",
                paddingLeft: "5px",
                paddingBottom: "5px",
              }}
            >
              Total Visitors Count: {singleBar.length}
            </div>
            {
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {tableHeader?.map((d, index) => (
                      <th key={index}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {singleBar &&
                    singleBar?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          {
                            data?.agent_metadata_detail?.cpuInfo?.[0]
                              ?.physicalId
                          }
                        </td>
                        <td>
                          {data?.agent_metadata_detail?.cpuInfo?.[0]?.modelName}
                        </td>
                        <td>
                          {data?.agent_metadata_detail?.cpuInfo?.[0]?.vendorId}
                        </td>
                        <td>{data?.agent_metadata_detail?.hostInfo?.os}</td>
                        <td>
                          {data?.agent_metadata_detail?.hostInfo?.platform}
                        </td>
                        <td>{data?.agent_metadata_detail?.hostIP}</td>
                        <td>{data?.agent_metadata_detail?.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
