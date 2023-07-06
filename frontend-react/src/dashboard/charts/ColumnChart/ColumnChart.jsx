import React from "react";
import { Chart } from "react-google-charts";

function ColumnChart({ jsonData }) {
  const data = [["Job Posting", "Applicant Count"]];

  jsonData.forEach((item) => {
    const role = item._id.role;
    const totalApplicants = item.totalApplicants;

    data.push([role, totalApplicants]);
  });
  return (
    <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
  );
}

export default ColumnChart;
