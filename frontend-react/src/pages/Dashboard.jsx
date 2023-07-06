import { Text } from "@mantine/core";
import DisplayCard from "../dashboard/charts/DisplayCard/DisplayCard";
import "./Dashboard.css";
import baseUrl from "../config";
import DonutChart from "../dashboard/charts/DonutChart/DonutChart";
import ColumnChart from "../dashboard/charts/ColumnChart/ColumnChart";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";

function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

function Dashboard() {
  const [globalData, setGlobalData] = useState({});
  const [dailyData, setDailyData] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/organization/${currentUser._id}/analysis?daily=0`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const resJSON = JSON.parse(result);
        setGlobalData(resJSON.data);
      })
      .catch((error) => console.log("error", error));

    fetch(
      `${baseUrl}/organization/${currentUser._id}/analysis?daily=1`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const resJSON = JSON.parse(result);
        setDailyData(resJSON.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {/* Global content */}
      <div className="dashboard-content content-row-1">
        <div className="global-container">
          <DisplayCard
            title="Total Job Postings"
            content={
              <Text mt="xs" size="3rem">
                {globalData.totalPostings ? globalData.totalPostings : "-"}
              </Text>
            }
          />
          <DisplayCard
            title="Total Applicants"
            content={
              <Text mt="xs" size="3rem">
                {globalData.totalApplicants
                  ? nFormatter(globalData.totalApplicants, 1)
                  : "-"}
              </Text>
            }
          />
        </div>
        <div className="global-container">
          <DisplayCard
            title="Today's Job Postings"
            content={
              <Text mt="xs" size="3rem">
                {dailyData.totalPostings ? dailyData.totalPostings : "-"}
              </Text>
            }
          />
          <DisplayCard
            title="Today's Applicants"
            content={
              <Text mt="xs" size="3rem">
                {dailyData.totalApplicants
                  ? nFormatter(dailyData.totalApplicants, 1)
                  : "-"}
              </Text>
            }
          />
        </div>
        <DonutChart
          title="Applicant's Distribution"
          jsonData={globalData.applications}
        />
      </div>
      <h2>Job Postings Distribution</h2>
      <div className="dashboard-content content-row-2">
        <ColumnChart jsonData={globalData.applications} />
      </div>
    </div>
  );
}

export default Dashboard;
