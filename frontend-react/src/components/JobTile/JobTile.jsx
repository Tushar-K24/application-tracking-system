import "./JobTile.css";
import { IconEdit, IconTrash, IconEye } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import JobModal from "../JobModal/JobModal";
import SkillsList from "../SkillsList/SkillsList";
import { useContext, useState } from "react";
import baseUrl from "../../config";
import { AuthContext } from "../../contexts/authContext";
import Tile from "../Tile/Tile";
import { Link, useNavigate } from "react-router-dom";

function JobTile({ job }) {
  const { authToken } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [disableEdit, setDisableEdit] = useState(false);
  const navigate = useNavigate();
  const colorScheme = {
    Open: "#198754",
    Closed: "#dc3545",
  };
  const style = {
    backgroundColor: "transparent",
    color: colorScheme[job.status],
    border: `1.5px solid ${colorScheme[job.status]}`,
  };

  const openView = () => {
    setDisableEdit(true);
    open();
  };

  const closeModal = () => {
    setDisableEdit(false);
    close();
  };

  const deleteTile = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/organization/${job.organization}/jobs/${job._id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    window.location.reload(false);
  };
  return (
    <div className="job-tile">
      <div className="job-tile-content">
        <Link className="job-tile-link" to={`/home/jobs/${job._id}`}>
          <h2>{job.role}</h2>
          <SkillsList skills={job.skills} />
        </Link>
      </div>
      <div className="job-tile-icons">
        <Tile classNames="status-tile" style={style} text={job.status} />
        <IconEye size={25} className="icon" onClick={openView} />
        <IconEdit size={25} className="icon" onClick={open} />
        <IconTrash size={25} className="icon" onClick={deleteTile} />
      </div>
      <JobModal
        job={job}
        disable={disableEdit}
        isOpen={opened}
        close={closeModal}
      />
    </div>
  );
}

export default JobTile;
