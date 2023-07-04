import { Button, Modal, Textarea } from "@mantine/core";
import "./ReviewModal.css";
import baseUrl from "../../config";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";

function ReviewModal({ isOpen, close, organization, job, applicant }) {
  const { authToken } = useContext(AuthContext);
  const [review, setReview] = useState("");

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify({
      review: review,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `${baseUrl}/organization/${organization}/jobs/${job}/applications/${applicant}`,
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
    setReview("");
    close();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={close}
      title="Add Review"
      size="60%"
      centered
    >
      <form className="review-form" onSubmit={handleSubmit}>
        <Textarea
          className="review-form-input"
          label="Review"
          id="review"
          value={review}
          onChange={handleReviewChange}
          minRows={10}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
}

export default ReviewModal;
