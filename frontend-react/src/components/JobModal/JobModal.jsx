import { Modal } from "@mantine/core";
import "./JobModal.css";
import { useContext, useState } from "react";
import { TextInput, Textarea, Select, Button } from "@mantine/core";
import { AuthContext } from "../../contexts/authContext";
import baseUrl from "../../config";

function JobModal({ job, disable, isOpen, close }) {
  const [role, setRole] = useState(job ? job.role : "");
  const [description, setDescription] = useState(job ? job.description : "");
  const [skills, setSkills] = useState(job ? job.skills : []);
  const [status, setStatus] = useState(job ? job.status : "Open");

  const { authToken, currentUser } = useContext(AuthContext);
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(", ").map((skill) => skill.trim());
    setSkills(skillsArray);
  };

  const handleStatusChange = (e) => {
    setStatus(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or data processing here
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify({
      role: role,
      description: description,
      skills: skills,
      status: status,
    });
    const method = job ? "PUT" : "POST";
    const url = job
      ? `${baseUrl}/organization/${currentUser._id}/jobs/${job._id}`
      : `${baseUrl}/organization/${currentUser._id}/jobs`;

    var requestOptions = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    console.log("Submitted:", { role, description, skills, status });
    window.location.reload();
    close();
    // setRole("");
    // setDescription("");
    // setSkills([]);
    // setStatus("Open");
  };

  return (
    <Modal
      opened={isOpen}
      onClose={close}
      title="Job Posting"
      size="60%"
      centered
    >
      <form className="job-form" onSubmit={handleSubmit}>
        <div className="form-input form-header">
          <TextInput
            className="job-role-input"
            label="Role"
            id="role"
            value={role}
            onChange={handleRoleChange}
            disabled={disable}
            required
          />
          <Select
            className="job-status-input"
            label="Status"
            id="status"
            value={status}
            onChange={handleStatusChange}
            disabled={disable}
            data={[
              { label: "Open", value: "Open" },
              { label: "Closed", value: "Closed" },
            ]}
          />
        </div>
        <Textarea
          className="form-input job-description-input"
          label="Description"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          disabled={disable}
          minRows={10}
          required
        />
        <TextInput
          className="form-input"
          label="Skills"
          id="skills"
          value={skills.join(", ")}
          disabled={disable}
          onChange={handleSkillsChange}
        />
        <Button type="submit" disabled={disable}>
          Submit
        </Button>
      </form>
    </Modal>
  );
}

export default JobModal;
