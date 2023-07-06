import React from "react";
import { Chart } from "react-google-charts";

function DonutChart({ title, jsonData }) {
  const data = [["Job", "Distribution of Applicants"]];

  jsonData.forEach((item) => {
    const role = item._id.role;
    const totalApplicants = item.totalApplicants;

    data.push([role, totalApplicants]);
  });

  const options = {
    title: title,
    titleTextStyle: {
      fontSize: 20,
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
