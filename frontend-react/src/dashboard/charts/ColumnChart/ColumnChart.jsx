import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Job Posting", "Applicant Count"],
  ["Software Developer", 32],
  ["Backend Developer", 12],
  ["Frontend Developer", 25],
  ["UI/UX Designer", 2],
  ["Operations Manager", 10],
];

function ColumnChart() {
  return (
    <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
  );
}

export default ColumnChart;
