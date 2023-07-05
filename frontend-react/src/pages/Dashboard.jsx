import { Text } from "@mantine/core";
import DisplayCard from "../dashboard/charts/DisplayCard/DisplayCard";
import "./Dashboard.css";
import DonutChart from "../dashboard/charts/DonutChart/DonutChart";
import ColumnChart from "../dashboard/charts/ColumnChart/ColumnChart";

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
  const jobPostings = 12;
  const totalApplicants = 1216;

  const dailyJobPostings = 5;
  const dailyApplicants = 52;

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
                {jobPostings}
              </Text>
            }
          />
          <DisplayCard
            title="Total Applicants"
            content={
              <Text mt="xs" size="3rem">
                {nFormatter(totalApplicants, 1)}
              </Text>
            }
          />
        </div>
        <div className="global-container">
          <DisplayCard
            title="Today's Job Postings"
            content={
              <Text mt="xs" size="3rem">
                {dailyJobPostings}
              </Text>
            }
          />
          <DisplayCard
            title="Today's Applicants"
            content={
              <Text mt="xs" size="3rem">
                {nFormatter(dailyApplicants, 1)}
              </Text>
            }
          />
        </div>
        <DonutChart title="Applicant's Distribution" />
      </div>
      <h2>Job Postings Distribution</h2>
      <div className="dashboard-content content-row-2">
        <ColumnChart />
      </div>
    </div>
  );
}

export default Dashboard;
