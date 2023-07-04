import { useContext, useEffect, useState } from "react";
import JobTile from "../JobTile/JobTile";
import { AuthContext } from "../../contexts/authContext";
import baseUrl from "../../config";
import { useDisclosure } from "@mantine/hooks";
import JobModal from "../JobModal/JobModal";
import Button from "../Button/Button";
import "./JobsList.css";

// const jobs = [
//   {
//     _id: "649888f24f1ae80d6f20cc50",
//     organization: "64982fb0562d63d09259c60c",
//     role: "SDE1",
//     description: "SDE1 desc",
//     skills: ["Python", "DSA"],
//     status: "Open",
//     __v: 0,
//   },
// ];

function JobsList() {
  const { authToken, currentUser } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        accepts: "application/json",
        authorization: `Bearer ${authToken}`,
      },
    };

    fetch(`${baseUrl}/organization/${currentUser._id}/jobs`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const jsonResult = JSON.parse(result);
        if (jsonResult.jobs) {
          setJobs(JSON.parse(result).jobs);
        }
      })
      .catch((error) => console.log("jobs list request error: ", error));
  }, []);
  return (
    <div className="job-list">
      <div className="job-list-header">
        <h1>Job Postings</h1>
        <Button text="Create new" handleClick={open} />
      </div>
      <div className="job-list-content">
        {jobs.map((job) => (
          <JobTile key={job._id} job={job} />
        ))}
      </div>
      <JobModal isOpen={opened} close={close} />
    </div>
  );
}

export default JobsList;
