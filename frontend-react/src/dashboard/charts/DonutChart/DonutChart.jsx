import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Job", "Distribution of Applicants"],
  ["Software Developer", 32],
  ["Backend Developer", 12],
  ["Frontend Developer", 25],
  ["UI/UX Designer", 2],
  ["Operations Manager", 10], // CSS-style declaration
];

function DonutChart({ title }) {
  const options = {
    title: title,
    titleTextStyle: {
      fontSize: 20, // Set the desired font-size
    },
    pieHole: 0.4,
    is3D: false,
  };

  return (
    <div className="chart-container">
      <Chart
        chartType="PieChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
      />
    </div>
  );
}

export default DonutChart;
