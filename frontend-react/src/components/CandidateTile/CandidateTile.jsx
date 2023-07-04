import { IconEdit, IconTrash } from "@tabler/icons-react";
import Tile from "../Tile/Tile";
import "./CandidateTile.css";
import { Accordion, NativeSelect } from "@mantine/core";
import baseUrl from "../../config";
import SkillsList from "../SkillsList/SkillsList";
import { AuthContext } from "../../contexts/authContext";
import { useContext, useState } from "react";
import Button from "../Button/Button";
import { useDisclosure } from "@mantine/hooks";
import ReviewModal from "../ReviewModal/ReviewModal";
const colorScheme = {
  Selected: "#198754",
  Rejected: "#dc3545",
  Ongoing: "#ff9800",
  Applied: "#007bff",
  Withdrawn: "#6c757d",
};

function CandidateTile({ applicant, job }) {
  const { authToken } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [status, setStatus] = useState("Applied");

  const updateStatus = (e) => {
    setStatus(e.target.value);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify({
      status: e.target.value,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `${baseUrl}/organization/${job.organization}/jobs/${job._id}/applications/${applicant.applicant._id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const jsonRes = JSON.parse(result);
        if (jsonRes) {
          console.log(jsonRes);
        }
      })
      .catch((error) => console.log("error", error));
    window.location.reload(false);
  };

  return (
    <>
      <Accordion.Item value={applicant._id}>
        <Accordion.Control>
          <div className="applicant-header">
            <p>{applicant.applicant.name}</p>
            <Tile
              style={{
                color: colorScheme[applicant.status],
                border: `1.5px solid ${colorScheme[applicant.status]}`,
                backgroundColor: "transparent",
              }}
              text={applicant.status}
            />
          </div>
        </Accordion.Control>
        <Accordion.Panel>
          <div className="applicant-content">
            <div className="applicant-content-desc">
              <p id="applicant-content-job">{job.role}</p>
              <h2 className="applicant-content-uni">
                {applicant.applicant.universityName}
              </h2>
              <SkillsList skills={applicant.applicant.skills} />
            </div>
            <div className="applicant-content-btns">
              <div className="applicant-content-btns-wrapper">
                <NativeSelect
                  data={[
                    "Select Status",
                    "Applied",
                    "Ongoing",
                    "Selected",
                    "Rejected",
                  ]}
                  onChange={updateStatus}
                  // value={status}
                  size="md"
                />
                <Button
                  classNames="applicant-review-btn"
                  text="Add a Review"
                  handleClick={open}
                />
              </div>
            </div>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
      <ReviewModal
        isOpen={opened}
        close={close}
        organization={job.organization}
        job={job._id}
        applicant={applicant.applicant._id}
      />
    </>
  );
}

export default CandidateTile;
