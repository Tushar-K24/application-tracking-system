import { NativeSelect, Accordion } from "@mantine/core";
import "./CandidatesTable.css";
import baseUrl from "../../config";
import SkillsList from "../SkillsList/SkillsList";
import Tile from "../Tile/Tile";
import Button from "../Button/Button";
import ReviewModal from "../ReviewModal/ReviewModal";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import CandidateTile from "../CandidateTile/CandidateTile";
// const applicants = [
//   {
//     _id: "6499995a7c57ecc9bfffca80",
//     job: "649888f24f1ae80d6f20cc50",
//     applicant: {
//       _id: "6499990d7c57ecc9bfffca79",
//       name: "user1",
//       email: "abc@user.com",
//       universityName: "GGSIPU",
//       skills: ["DSA"],
//       __v: 0,
//     },
//     status: "Selected",
//     review: [],
//     __v: 0,
//   },
//   {
//     _id: "649999877c57ecc9bfffca86",
//     job: "649888f24f1ae80d6f20cc50",
//     applicant: {
//       _id: "649999157c57ecc9bfffca7b",
//       name: "user2",
//       email: "abc@user2.com",
//       universityName: "USICT",
//       skills: ["SQL", "Node.js"],
//       __v: 0,
//     },
//     status: "Ongoing",
//     review: [],
//     __v: 0,
//   },
// ];

function CandidatesTable() {
  const { currentUser, authToken } = useContext(AuthContext);
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [applicants, setApplicants] = useState([]);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);

  var requestOptions = {
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    requestOptions.method = "GET";
    fetch(
      `${baseUrl}/organization/${currentUser._id}/jobs/${id}/applications`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const jsonRes = JSON.parse(result);
        if (jsonRes.applications) {
          // console.log(jsonRes.applications);
          setApplicants(jsonRes.applications);
        }
      })
      .catch((error) => console.log("error", error));

    fetch(
      `${baseUrl}/organization/${currentUser._id}/jobs/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const jsonRes = JSON.parse(result);
        // console.log(jsonRes);
        if (jsonRes.job) {
          // console.log(jsonRes.applications);
          setJob(jsonRes.job);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="list">
      <div className="list-header">
        <h1>Applicants</h1>
      </div>
      <Accordion multiple="true">
        {applicants.map((applicant) => {
          return (
            <CandidateTile
              key={applicant._id}
              applicant={applicant}
              job={job}
            />
          );
        })}
      </Accordion>
    </div>
  );
}

export default CandidatesTable;
